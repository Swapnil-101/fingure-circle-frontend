import React, { useEffect, useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';

interface MessageProps {
    avatarSrc: string;
    username: string;
    message: string;
}

const Message: React.FC<MessageProps> = ({ avatarSrc, username, message }) => (
    <div className="flex items-center mb-2">
        <img className="w-8 h-8 rounded-full mr-2" src={avatarSrc} alt="User Avatar" />
        <div className="font-medium">{username}</div>
        <div className="bg-white rounded-lg p-2 shadow mb-2 max-w-sm">{message}</div>
    </div>
);

interface ChatInputProps {
    onSend: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
    const [message, setMessage] = React.useState('');

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
    onSend: (message: string) => void;
    onSelectMentor: (mentorId: number) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ userAvatarSrc, onSelectMentor }: any) => {
    const [messages, setMessages] = useState<MessageProps[]>([]);
    const [mentors, setMentors] = useState<any[]>([]);
    const [selectedMentorId, setSelectedMentorId] = useState<number | null>(null);
    const [data, setData] = useState<any>({});

    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}";
        setData(JSON.parse(degree));
    }, []);

    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/assigned_mentors`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setMentors(response.data.assigned_mentors);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, []);

    const handleSend = (message: string) => {
        if (!selectedMentorId) {
            console.error('No mentor selected to send message to.');
            return;
        }

        const newMessage: MessageProps = {
            avatarSrc: userAvatarSrc,
            username: 'You',
            message
        };
        setMessages([...messages, newMessage]);
        
        // Perform other actions to handle message sending, such as API calls, if needed
    };

    const handleMentorSelect = (mentorId: number) => {
        setSelectedMentorId(mentorId);
        onSelectMentor(mentorId);
    };

    return (
        <div className="h-[25rem] flex">
            <div className="w-1/4 bg-gray-100 p-2 overflow-y-scroll">
                {mentors.map((mentor: any) => (
                    <div key={mentor.id} className="mb-2 p-2 border rounded" onClick={() => handleMentorSelect(mentor.id)}>
                        <div className="font-medium">{mentor.mentor_name}</div>
                        <div>{mentor.stream_name}</div>
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
