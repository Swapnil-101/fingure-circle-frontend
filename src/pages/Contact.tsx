import Calendar from '@/components/contact/Celender';
//@ts-ignore
import { ChatBox } from '@/components/contact/ChatBox';
import SchedulesCard from '@/components/SchudleMeeting.tsx/SchedulesCard';
import React from 'react';

//@ts-ignore
interface MessageProps {
    avatarSrc: string;
    username: string;
    message: string;
}

const Contact: React.FC = () => {
    const [selectedMentorId, setSelectedMentorId] = React.useState<number | null>(null);

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
        <div className=''>
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
            <div className='w-[100%] flex'>
                <div className='w-[50%]'> 
                    <Calendar />
                </div>
                <div className='w-[50%]'> 
                    <SchedulesCard />
                </div>
            </div>
        </div>
    );
}

export default Contact;
