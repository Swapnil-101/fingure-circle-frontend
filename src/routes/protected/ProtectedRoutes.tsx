// ProtectedRoutes.jsx

import MainMentor from '@/components/mentor/MainMentor';
import AdminVerfy from '@/pages/AdminVerfy';
import BasicInfo from '@/pages/BasicInfo';
import BecomeMentor from '@/pages/BecomeMentor';
import Contact from '@/pages/Contact';
import FeedBack from '@/pages/FeedBack';
import FutureProfile from '@/pages/FutureProfile';
import Meeting from '@/pages/Meeting';
import Mentor from '@/pages/Mentor';
import MentorList from '@/pages/MentorList';
import MyExperts from '@/pages/MyExperts';
import Question from '@/pages/Question';
import RazerPay from '@/pages/RazerPay';

import Home from 'pages/Home';

const ProtectedRoutes = (user: any) => {
    console.log("user", user)
    // const isBasicInfoFilled = user?.isBasicInfoFilled;

    const routes = [
        {
            path: '/',
            component: <Home />,
        },
        {
            path: '/expert',
            component: <Mentor />,
        },
        {
            path: '/question-ans',
            component: <Question />,
        },
        {
            path: '/future-profile',
            component: <FutureProfile />,
        },
        {
            path: '/basic-info',
            component: <BasicInfo />,
        },
        {
            path: '/view-expert',
            component: <MainMentor />,
        },
        {
            path: '/contact-expert',
            component: <Contact />,
        },
        {
            path: '/feedback',
            component: <FeedBack />,
        },
        {
            path: '/become-expert',
            component: <BecomeMentor />,
        },
        {
            path: '/admin-verfy-mentor',
            component: <AdminVerfy />,
        },
        {
            path: '/admin-mentor-lists',
            component: <MentorList />,
        },
        {
            path: '/razerpay',
            component: <RazerPay />,
        },

        {
            path: `/meeting/:id`,
            component: <Meeting />,
        },


        {
            path: '/myexpert',
            component: <MyExperts />,
        },

    ];

    return routes;
};

export default ProtectedRoutes;
