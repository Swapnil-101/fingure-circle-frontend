import Login from 'pages/Login';
import Register from 'pages/Register';

const PublicRoutes = [
    {
        path: '/login',
        component: <Login />,
    },
    {
        path: '/register',
        component: <Register />,
    },
]

export default PublicRoutes;