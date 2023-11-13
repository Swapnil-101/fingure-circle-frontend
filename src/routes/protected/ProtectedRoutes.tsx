// ProtectedRoutes.jsx
import React from 'react';
import BasicInfo from '@/pages/BasicInfo';
import FutureProfile from '@/pages/FutureProfile';
import Mentor from '@/pages/Mentor';
import Question from '@/pages/Question';
import Home from 'pages/Home';

const ProtectedRoutes = (user: any) => {
    const isBasicInfoFilled = user?.isBasicInfoFilled;

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
    ];

    return routes;
};

export default ProtectedRoutes;
