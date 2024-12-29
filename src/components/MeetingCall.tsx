import { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, Users, X, Pin, PinOff } from 'lucide-react';

interface MeetingCallProps {
  roomId: string;
  password?: string;
  isHost: boolean;
}

interface PeerData {
  stream: MediaStream;
  call: MediaConnection;
}

interface ControlButtonProps {
  onClick: () => void;
  active: boolean;
  activeColor?: string;
  inactiveColor?: string;
  children: React.ReactNode;
}

interface RoomErrorModalProps {
  title: string;
  message: string;
}

interface ScreenShareControlsProps {
  isPinned: boolean;
  onTogglePin: () => void;
}

const MeetingCall = ({ roomId, password, isHost }: MeetingCallProps) => {
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [peers, setPeers] = useState<Map<string, PeerData>>(new Map());
  const [screenSharingStream, setScreenSharingStream] = useState<MediaStream | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [participants, setParticipants] = useState<Set<string>>(new Set());
  const [roomFull, setRoomFull] = useState(false);
  const [roomNotFound, setRoomNotFound] = useState(false);
  const [screenSharingPeerId, setScreenSharingPeerId] = useState<string | null>(null);
  const [isScreenSharePinned, setIsScreenSharePinned] = useState(true);
  const peerConnectionsRef = useRef<Map<string, PeerData>>(new Map());
  const [screenStream, setScreenStream] = useState<MediaStream | null>(null);
  const screenVideoRef = useRef<HTMLVideoElement | null>(null);
  const MAX_PARTICIPANTS = 8;

  useEffect(() => {
    peerConnectionsRef.current = peers;
  }, [peers]);

  const cleanupMedia = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    if (screenSharingStream) {
      screenSharingStream.getTracks().forEach(track => track.stop());
    }
    peerConnectionsRef.current.forEach(({ stream, call }) => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (call) {
        call.close();
      }
    });
    if (peer) {
      peer.destroy();
    }
  };

  const connectToPeer = async (remotePeerId: string, stream: MediaStream, peerInstance: Peer): Promise<void> => {
    if (!peerInstance) return;

    try {
      const call = peerInstance.call(remotePeerId, stream);

      call.on('stream', (remoteStream: MediaStream) => {
        setPeers(prev => {
          const newPeers = new Map(prev);
          newPeers.set(remotePeerId, {
            stream: remoteStream,
            call
          });
          return newPeers;
        });
        setParticipants(prev => new Set([...prev, remotePeerId]));
      });

      call.on('close', () => {
        setPeers(prev => {
          const newPeers = new Map(prev);
          newPeers.delete(remotePeerId);
          return newPeers;
        });
        setParticipants(prev => {
          const newParticipants = new Set(prev);
          newParticipants.delete(remotePeerId);
          return newParticipants;
        });
      });

      call.on('error', (error: Error) => {
        console.error('Call error:', error);
        call.close();
      });

    } catch (error) {
      console.error('Error connecting to peer:', error);
      throw error;
    }
  };

  const handleIncomingCall = (localStream: MediaStream) => (call: MediaConnection) => {
    if (peerConnectionsRef.current.size >= MAX_PARTICIPANTS - 1) {
      call.close();
      setRoomFull(true);
      return;
    }

    call.answer(localStream);

    call.on('stream', (remoteStream: MediaStream) => {
      setPeers(prev => {
        const newPeers = new Map(prev);
        newPeers.set(call.peer, {
          stream: remoteStream,
          call
        });
        return newPeers;
      });
      setParticipants(prev => new Set([...prev, call.peer]));
    });

    call.peerConnection.ondatachannel = (event) => {
      const channel = event.channel;
      channel.onmessage = (messageEvent) => {
        try {
          const data = JSON.parse(messageEvent.data);
          if (data.type === 'screenShare') {
            if (data.action === 'start') {
              setScreenSharingPeerId(data.peerId);
              setIsScreenSharePinned(true);
            } else if (data.action === 'stop') {
              setScreenSharingPeerId(null);
              setIsScreenSharePinned(true);
            }
          }
        } catch (error) {
          console.error('Error parsing data channel message:', error);
        }
      };
    };

    call.on('close', () => {
      setPeers(prev => {
        const newPeers = new Map(prev);
        newPeers.delete(call.peer);
        return newPeers;
      });
      setParticipants(prev => {
        const newParticipants = new Set(prev);
        newParticipants.delete(call.peer);
        return newParticipants;
      });
    });
  };

  useEffect(() => {
    let peerInstance: Peer;
    let timeoutId: NodeJS.Timeout;

    const initializePeer = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });

        setLocalStream(stream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }

        const peerId = isHost ? roomId : `${roomId}-${Math.random().toString(36).substr(2, 9)}`;

        peerInstance = new Peer(peerId, {
          config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' },
              { urls: 'stun:global.stun.twilio.com:3478' }
            ]
          },
          debug: 3
        });

        setPeer(peerInstance);

        peerInstance.on('open', async (id: string) => {
          setParticipants(prev => new Set([...prev, id]));

          if (!isHost) {
            timeoutId = setTimeout(() => {
              setRoomNotFound(true);
            }, 10000);

            try {
              await connectToPeer(roomId, stream, peerInstance);
              clearTimeout(timeoutId);
            } catch (error) {
              clearTimeout(timeoutId);
              setRoomNotFound(true);
            }
          }
        });

        peerInstance.on('call', handleIncomingCall(stream));

        peerInstance.on('disconnected', () => {
          console.log('Disconnected from server, attempting to reconnect...');
          peerInstance.reconnect();
        });

        peerInstance.on('error', (err: Error) => {
          console.error('PeerJS error:', err);
          if (err.message.includes('Could not connect to peer')) {
            setRoomNotFound(true);
          }
        });

      } catch (error) {
        console.error('Error accessing media devices:', error);
        alert('Unable to access camera or microphone. Please check your permissions.');
      }
    };

    initializePeer();

    return () => {
      clearTimeout(timeoutId);
      cleanupMedia();
    };
  }, [roomId, password, isHost]);

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const startScreenSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      });

      setScreenSharingStream(stream);
      setScreenStream(stream);
      setScreenSharingPeerId(peer?.id || null);
      setIsScreenSharePinned(true);

      // Create a new peer connection for screen sharing
      peers.forEach(({ call }) => {
        // Send screen sharing stream to all peers
        const screenTrack = stream.getVideoTracks()[0];
        const sender = call.peerConnection.getSenders().find(s => s.track?.kind === 'video');

        if (sender) {
          sender.replaceTrack(screenTrack).then(() => {
            // Send message to peers that screen sharing has started
            call.peerConnection.createDataChannel('screenShare').send(JSON.stringify({
              type: 'screenShare',
              action: 'start',
              peerId: peer?.id
            }));
          });
        }
      });

      // Handle screen sharing stop
      stream.getVideoTracks()[0].onended = () => {
        stopScreenSharing();
      };

    } catch (error) {
      console.error('Error sharing screen:', error);
      alert('Failed to start screen sharing');
    }
  };

  const stopScreenSharing = () => {
    if (screenSharingStream) {
      screenSharingStream.getTracks().forEach(track => track.stop());

      // Notify peers that screen sharing has stopped
      peers.forEach(({ call }) => {
        if (localStream) {
          const videoTrack = localStream.getVideoTracks()[0];
          const sender = call.peerConnection.getSenders().find(s => s.track?.kind === 'video');

          if (sender && videoTrack) {
            sender.replaceTrack(videoTrack).then(() => {
              try {
                call.peerConnection.createDataChannel('screenShare').send(JSON.stringify({
                  type: 'screenShare',
                  action: 'stop'
                }));
              } catch (error) {
                console.error('Error sending screen share stop:', error);
              }
            });
          }
        }
      });

      setScreenSharingStream(null);
      setScreenStream(null);
      setScreenSharingPeerId(null);
      setIsScreenSharePinned(true);
    }
  };


  const endCall = () => {
    cleanupMedia();
    window.location.href = '/';
  };

  const ControlButton = ({ onClick, active, activeColor = "bg-blue-600", inactiveColor = "bg-gray-600", children }: ControlButtonProps) => (
    <button
      onClick={onClick}
      className={`${active ? activeColor : inactiveColor} p-3 rounded-full text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors`}
    >
      {children}
    </button>
  );

  const ScreenShareControls = ({ isPinned, onTogglePin }: ScreenShareControlsProps) => (
    <div className="absolute top-4 right-4 z-10">
      <button
        onClick={onTogglePin}
        className="bg-gray-800 bg-opacity-75 p-2 rounded-full text-white hover:bg-opacity-100 transition-all"
        title={isPinned ? "Unpin screen share" : "Pin screen share"}
      >
        {isPinned ? <PinOff size={20} /> : <Pin size={20} />}
      </button>
    </div>
  );

  const RoomErrorModal = ({ title, message }: RoomErrorModalProps) => (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">{title}</h2>
          <button
            onClick={() => window.location.href = '/'}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        <p className="mb-6 text-gray-600">{message}</p>
        <button
          onClick={() => window.location.href = '/'}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Return to Home
        </button>
      </div>
    </div>
  );

  const renderParticipantVideos = () => {
    const screenSharer = Array.from(peers.entries()).find(([peerId]) => peerId === screenSharingPeerId);
    const regularParticipants = Array.from(peers.entries()).filter(([peerId]) => peerId !== screenSharingPeerId);

    if (screenSharingPeerId) {
      const screenContent = (
        <div className={`relative bg-black rounded-lg overflow-hidden ${isScreenSharePinned ? 'h-[70vh]' : 'h-[240px]'}`}>
          {screenSharingPeerId === peer?.id ? (
            <video
              ref={screenVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-contain"
              srcObject={screenStream || null}
            />
          ) : screenSharer && (
            <video
              autoPlay
              playsInline
              className="w-full h-full object-contain"
              ref={video => {
                if (video) video.srcObject = screenSharer[1].stream;
              }}
            />
          )}
          <ScreenShareControls
            isPinned={isScreenSharePinned}
            onTogglePin={() => setIsScreenSharePinned(!isScreenSharePinned)}
          />
        </div>
      );

      if (isScreenSharePinned) {
        return (
          <div className="grid grid-cols-1 gap-4">
            {screenContent}
            <div className="flex gap-2 overflow-x-auto py-2">
              <div className="flex-none w-48">
                <video
                  ref={screenSharingPeerId === peer?.id ? null : localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-28 object-cover rounded-lg"
                />
              </div>
              {regularParticipants.map(([peerId, { stream }]) => (
                <div key={peerId} className="flex-none w-48">
                  <video
                    autoPlay
                    playsInline
                    className="w-full h-28 object-cover rounded-lg"
                    ref={video => {
                      if (video) video.srcObject = stream;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      } else {
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {screenContent}
            <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
              <video
                ref={screenSharingPeerId === peer?.id ? null : localVideoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-[240px] object-cover"
              />
              <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                You {isHost ? "(Host)" : ""}
              </div>
            </div>
            {regularParticipants.map(([peerId, { stream }]) => (
              <div key={peerId} className="relative bg-white rounded-lg shadow-md overflow-hidden">
                <video
                  autoPlay
                  playsInline
                  className="w-full h-[240px] object-cover"
                  ref={video => {
                    if (video) video.srcObject = stream;
                  }}
                />
                <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
                  Participant
                </div>
              </div>
            ))}
          </div>
        );
      }
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="relative bg-white rounded-lg shadow-md overflow-hidden">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-[240px] object-cover"
          />
          <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
            You {isHost ? "(Host)" : ""}
          </div>
        </div>

        {Array.from(peers.entries()).map(([peerId, { stream }]) => (
          <div key={peerId} className="relative bg-white rounded-lg shadow-md overflow-hidden">
            <video
              autoPlay
              playsInline
              className="w-full h-[240px] object-cover"
              ref={video => {
                if (video) video.srcObject = stream;
              }}
            />
            <div className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              Participant
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (roomNotFound) {
    return (
      <RoomErrorModal
        title="Room Not Found"
        message="The room you're trying to join doesn't exist or is no longer available."
      />
    );
  }

  if (roomFull) {
    return (
      <RoomErrorModal
        title="Room is Full"
        message={`This room has reached its maximum capacity of ${MAX_PARTICIPANTS} participants.`}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center text-gray-300">
            <Users className="mr-2" size={20} />
            <span>{participants.size} / {MAX_PARTICIPANTS} participants</span>
          </div>
          {screenSharingPeerId && (
            <div className="text-gray-300">
              <span className="text-sm">
                {screenSharingPeerId === peer?.id ? "You are" : "Participant is"} sharing screen
              </span>
            </div>
          )}
        </div>

        {renderParticipantVideos()}

        {/* Controls */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-center space-x-4">
            <ControlButton
              onClick={toggleAudio}
              active={isAudioEnabled}
              activeColor="bg-gray-600"
              inactiveColor="bg-red-600"
            >
              {isAudioEnabled ? <Mic size={24} /> : <MicOff size={24} />}
            </ControlButton>
            <ControlButton
              onClick={toggleVideo}
              active={isVideoEnabled}
              activeColor="bg-gray-600"
              inactiveColor="bg-red-600"
            >
              {isVideoEnabled ? <Video size={24} /> : <VideoOff size={24} />}
            </ControlButton>
            <ControlButton
              onClick={screenSharingStream ? stopScreenSharing : startScreenSharing}
              active={!screenSharingStream}
              activeColor="bg-gray-600"
            >
              <Monitor size={24} />
            </ControlButton>
            <ControlButton
              onClick={endCall}
              active={false}
              inactiveColor="bg-red-600"
            >
              <PhoneOff size={24} />
            </ControlButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCall;