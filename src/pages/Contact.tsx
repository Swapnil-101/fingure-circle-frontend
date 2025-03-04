import Calendar from '@/components/contact/Celender';
//@ts-ignore
import { ChatBox } from '@/components/contact/ChatBox';
import SchedulesCard from '@/components/SchudleMeeting.tsx/SchedulesCard';
import React from 'react';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
import { useState } from 'react';
//@ts-ignore
interface MessageProps {
    avatarSrc: string;
    username: string;
    message: string;
}

const Contact: React.FC = () => {
    const [selectedMentorId, setSelectedMentorId] = React.useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'mentor' | 'followers'>('mentor');

    const [count, setCount] = useState<any>(0);
    useRedirectIfNotLoggedIn()

    //@ts-ignore
    const handleSelectMentor = (mentorId: number) => {
        console.log("checking==>", selectedMentorId);
        setSelectedMentorId(mentorId);
    };




    // const handleSend = (message: string) => {
    //     const newMessage: MessageProps = {
    //         avatarSrc: 'https://picsum.photos/50/50',
    //         username: '',
    //         message,
    //     };

    //     setMessages([...messages, newMessage]);
    // };

    return (
        <div className='p-4'>

            <div className='flex border-b mb-4'>
                <button
                    className={`px-4 py-2 ${activeTab === 'mentor' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                    onClick={() => setActiveTab('mentor')}
                >
                    My Mentor
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'followers' ? 'border-b-2 border-blue-500 font-bold' : ''}`}
                    onClick={() => setActiveTab('followers')}
                >
                    My Followers
                </button>
            </div>
            {/* <div className='w-[50%] mt-[66px] mx-[2rem]'> */}
            {/* <ChatBox
                    onSelectMentor={handleSelectMentor}
                    userAvatarSrc="https://picsum.photos/50/50"
                    userId={1}  // Replace this with the appropriate user ID
                    // onSend={handleSend}
                    selectedMentorIds={selectedMentorId}
                /> */}
            {/* <Chat /> */}
            {/* </div> */}
            {activeTab === 'mentor' ? (
                <div className='w-[100%] flex'>
                    <div className='w-[50%]'>
                        <Calendar count={count} setCount={setCount} />
                    </div>
                    <div className='w-[50%]'>
                        <SchedulesCard count={count} setCount={setCount} />
                    </div>
                </div>
            ) : (
                <div>
                    {/* Add followers component here */}
                    <p>Followers chat or content goes here...</p>
                </div>
            )}

        </div>
    );
}

export default Contact;
