import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import MeetingCall from '@/components/MeetingCall';

 const MeetingCalls = () => {
    const [roomId, setRoomId] = useState('');
    const [password, setPassword] = useState('');
    const [isHost, setIsHost] = useState(false);
    const [joinedRoom, setJoinedRoom] = useState(false);
    const [error, setError] = useState('');

    const validateInput = () => {
        if (!roomId.trim()) {
            setError('Please enter a room ID');
            return false;
        }
        if (roomId.length < 4) {
            setError('Room ID must be at least 4 characters');
            return false;
        }
        if (isHost && !password.trim()) {
            setError('Please enter a password');
            return false;
        }
        if (isHost && password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }
        return true;
    };

    const createRoom = () => {
        setIsHost(true);
        if (validateInput()) {
            setError('');
            setJoinedRoom(true);
        }
    };

    const joinRoom = () => {
        setIsHost(false);
        if (validateInput()) {
            setError('');
            setJoinedRoom(true);
        }
    };

    if (joinedRoom) {
        return <MeetingCall roomId={roomId} password={password} isHost={isHost} />;
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto">
                <div className="bg-gray-800 rounded-lg shadow-md p-6">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-white">
                            Video Conference
                        </h2>
                        <p className="mt-2 text-sm text-gray-300">
                            Create a new room or join an existing one
                        </p>
                    </div>

                    {error && (
                        <div className="mb-4 p-3 bg-red-900 border border-red-700 rounded-md flex items-center text-red-200">
                            <AlertCircle className="mr-2" size={20} />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="roomId" className="block text-sm font-medium text-gray-200 mb-1">
                                Room ID
                            </label>
                            <input
                                id="roomId"
                                type="text"
                                value={roomId}
                                onChange={(e) => {
                                    setRoomId(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter room ID (min 4 characters)"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                                Password
                                {!isHost && <span className="text-gray-400 text-xs ml-1">(Required only when creating room)</span>}
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                placeholder="Enter password (min 6 characters)"
                                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div className="flex space-x-4 pt-4">
                            <button
                                onClick={createRoom}
                                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50"
                                disabled={!roomId.trim()}
                            >
                                Create Room
                            </button>
                            <button
                                onClick={joinRoom}
                                className="w-full bg-gray-700 text-blue-400 px-4 py-2 rounded-md border border-blue-400 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors disabled:opacity-50"
                                disabled={!roomId.trim()}
                            >
                                Join Room
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MeetingCalls;