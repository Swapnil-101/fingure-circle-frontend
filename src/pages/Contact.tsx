import Calendar from '@/components/contact/Celender';
//@ts-ignore
import { ChatBox } from '@/components/contact/ChatBox';
import SchedulesCard from '@/components/SchudleMeeting.tsx/SchedulesCard';
import React, { useEffect } from 'react';
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
import { useState } from 'react';
import FeedBackCards from '@/components/feedback/FeedBackCards';
import axios from 'axios';
import baseURL from '@/config/config';
//@ts-ignore
interface MessageProps {
    avatarSrc: string;
    username: string;
    message: string;
}

const Contact: React.FC = () => {
    const [selectedMentorId, setSelectedMentorId] = React.useState<number | null>(null);
    const [activeTab, setActiveTab] = useState<'mentor' | 'followers'>('mentor');

    const [feedback, setFeedback] = useState<any>([]);
    const [count, setCount] = useState<any>(0);
    useRedirectIfNotLoggedIn()

    //@ts-ignore
    const handleSelectMentor = (mentorId: number) => {
        console.log("checking==>", selectedMentorId);
        setSelectedMentorId(mentorId);
    };


    useEffect(() => {
        const fetchUnFeedback = async () => {
            try {
                const name = localStorage.getItem('token');
                if (name) {
                    const response = await axios.get(`${baseURL}/feedback`, {
                        params: { user_id: 1 },
                    });
                    console.log("checking==>", response.data);
                    setFeedback(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUnFeedback();

    }, [])





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
                <div>
                    <div className='w-[100%] h-[40vh] flex overflow-y-scroll'>
                        <div className='w-[50%]'>
                            <Calendar count={count} setCount={setCount} />
                        </div>
                        <div className='w-[50%]'>
                            <SchedulesCard count={count} setCount={setCount} />
                        </div>
                    </div>

                    <div>
                        <FeedBackCards feedback={feedback} />
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
