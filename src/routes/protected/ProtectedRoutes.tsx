/*
*@ import protected pages
*/
import BasicInfo from '@/pages/BasicInfo';
import Mentor from '@/pages/Mentor';
import Question from '@/pages/Question';
import Home from 'pages/Home';

const ProtectedRoutes = [
    {
        path: '/',
        component: <Home />,
    },
    {
        path: '/basic-info',
        component: <BasicInfo />,
    },
    {
        path: '/expert',
        component: <Mentor />,
    },
    {
        path: '/question-ans',
        component: <Question />,
    },
]

export default ProtectedRoutes;