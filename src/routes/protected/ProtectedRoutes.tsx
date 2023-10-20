/*
*@ import protected pages
*/
import Home from 'pages/Home';

const ProtectedRoutes = [
    {
        path: '/',
        component: <Home />,
    },
]

export default ProtectedRoutes;