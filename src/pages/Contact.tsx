import Calendar from '@/components/contact/Celender';
import { ChatBox } from '@/components/contact/ChatBox'
import Note from '@/components/contact/Note';
import React from 'react'

const Contact: React.FC = () => {
    interface MessageProps {
        avatarSrc: string;
        username: string;
        message: string;
    }
    const [messages, setMessages] = React.useState<MessageProps[]>([
        { avatarSrc: 'https://picsum.photos/50/50', username: 'John Doe', message: 'Hi, how can I help you?' },
        { avatarSrc: 'https://picsum.photos/50/50', username: '', message: 'Sure, I can help with that.' },
    ]);

    const handleSend = (message: string) => {
        const newMessage: MessageProps = {
            avatarSrc: 'https://picsum.photos/50/50',
            username: '',
            message,
        };

        setMessages([...messages, newMessage]);
    };
    return (
        <div className='md:flex justify-between '>
            <div className='w-[50%] mt-[66px] mx-[2rem]'>
                <ChatBox userAvatarSrc="https://picsum.photos/50/50" messages={messages} onSend={handleSend} />
                <Note />
            </div>
            <div className='w-[50%]'>
                <Calendar />
            </div>
        </div>
    )
}

export default Contact