/*
*@ import protected pages
*/
import BasicInfo from '@/pages/BasicInfo';
import Mentor from '@/pages/Mentor';
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
]

export default ProtectedRoutes;