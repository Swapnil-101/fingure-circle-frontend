// ProtectedRoutes.jsx

import MainMentor from '@/components/mentor/MainMentor';
import BasicInfo from '@/pages/BasicInfo';
import BecomeMentor from '@/pages/BecomeMentor';
import Contact from '@/pages/Contact';
import FeedBack from '@/pages/FeedBack';
import FutureProfile from '@/pages/FutureProfile';
import Mentor from '@/pages/Mentor';
import Question from '@/pages/Question';
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
    ];

    return routes;
};

export default ProtectedRoutes;
