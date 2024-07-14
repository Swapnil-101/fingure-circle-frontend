import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import socket from '../../config/socket'; // Import the socket instance

interface MessageProps {
    avatarSrc: string;
    username: string;
    message: string;
    timestamp: string;
}

const Message: React.FC<MessageProps> = ({ avatarSrc, username, message, timestamp }) => (
    <div className="flex items-center mb-2">
        <img className="w-8 h-8 rounded-full mr-2" src={avatarSrc} alt="User Avatar" />
        <div className="font-medium">{username}</div>
        <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">{message}</div>
        <div className="text-xs text-gray-500 ml-2">{new Date(timestamp).toLocaleString()}</div>
    </div>
);

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        onSend(message);
        setMessage('');
    };

    return (
        <div className="bg-gray-100 px-4 py-2">
            <div className="flex items-center">
                <input
                    className="w-full border rounded-full py-2 px-4 mr-2"
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-full"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

interface ChatBoxProps {
    userAvatarSrc: string;
    userId: number;
    onSelectMentor: (mentorId: number) => void;
    selectedMentorIds: any;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ userAvatarSrc, userId, onSelectMentor, selectedMentorIds }) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [mentors, setMentors] = useState<any[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
    console.log("checkingmentor", userId, selectedMentorId)
    const [data, setData] = useState<any>({});

    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}";
        setData(JSON.parse(degree));
    }, []);

    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/assigned_mentors`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setMentors(response.data.assigned_mentors);
            } catch (error) {
                console.error('Error fetching mentors:', error);
            }
        };

        fetchMentors();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/assigned_users`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setUsers(response.data.assigned_users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (selectedMentorId) {
            const room = `${Math.min(userId, selectedMentorId)}_${Math.max(userId, selectedMentorId)}`;
            socket.emit('join_room', { sender_id: userId, receiver_id: selectedMentorId });

            socket.emit('get_messages', { sender_id: userId, receiver_id: selectedMentorId });

            socket.on('message_history', (data) => {
                setMessages(data.messages.map((msg: any) => ({
                    ...msg,
                    avatarSrc: msg.sender_id === userId ? userAvatarSrc : 'https://picsum.photos/50/50',
                    username: msg.sender_id === userId ? 'You' : `Mentor ${msg.sender_id}`,
                    timestamp: msg.timestamp,
                })));
            });

            socket.on('message_error', (error) => {
                console.error('Error fetching messages:', error);
            });

            return () => {
                socket.off('message_history');
                socket.off('message_error');
            };
        }
    }, [selectedMentorId]);

    useEffect(() => {
        socket.on('receive_message', (data: any) => {
            const { sender_id, message, timestamp } = data;
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    avatarSrc: sender_id === userId ? userAvatarSrc : 'https://picsum.photos/50/50',
                    username: sender_id === userId ? 'You' : `Mentor ${sender_id}`,
                    message,
                    timestamp,
                },
            ]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const handleSend = (message: string) => {
        if (!selectedMentorId) {
            console.error('No mentor selected to send message to.');
            return;
        }

        const newMessage: MessageProps = {
            avatarSrc: userAvatarSrc,
            username: 'You',
            message,
            timestamp: new Date().toISOString(),
        };

        setMessages([...messages, newMessage]);

        socket.emit('send_message', {
            sender_id: userId,
            receiver_id: selectedMentorId,
            message,
        });
    };

    const handleMentorSelect = (mentorId: number) => {
        setSelectedMentorId(mentorId);
        setSelectedUserId(null); // Deselect user when a mentor is selected
        onSelectMentor(mentorId);
    };

    const handleUserSelect = (userId: number) => {
        setSelectedUserId(userId);
        setSelectedMentorId(null); // Deselect mentor when a user is selected
        onSelectMentor(userId);
    };

    return (
        <div className="h-[25rem] flex">
            <div className="w-1/4 bg-gray-100 p-2 overflow-y-scroll">
                <h2 className="font-bold mb-2">Mentors</h2>
                {mentors.map((mentor) => (
                    <div key={mentor.id} className="mb-2 p-2 border rounded" onClick={() => handleMentorSelect(mentor.id)}>
                        <div className="font-medium">{mentor.mentor_name}</div>
                        <div>{mentor.stream_name}</div>
                    </div>
                ))}
                <h2 className="font-bold mb-2">Users</h2>
                {users.map((user) => (
                    <div key={user.id} className="mb-2 p-2 border rounded" onClick={() => handleUserSelect(user.id)}>
                        <div className="font-medium">{user.username}</div>
                    </div>
                ))}
            </div>
            <div className="flex-1 flex flex-col">
                <div className="bg-gray-200 flex-1 overflow-y-scroll px-4 py-2">
                    {messages.map((msg, index) => (
                        <Message key={index} {...msg} />
                    ))}
                </div>
                <ChatInput onSend={handleSend} />
            </div>
        </div>
    );
};
