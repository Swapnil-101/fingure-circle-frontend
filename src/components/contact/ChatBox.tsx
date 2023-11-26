import React from 'react';

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
    messages: MessageProps[];
    onSend: (message: string) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({ userAvatarSrc, messages, onSend }) => (
    <div className="h-[25rem] flex flex-col">
        <div className="bg-gray-200 flex-1 overflow-y-scroll px-4 py-2">
            {messages.map((msg, index) => (
                <Message key={index} {...msg} />
            ))}
        </div>
        <ChatInput onSend={onSend} />
    </div>
);
