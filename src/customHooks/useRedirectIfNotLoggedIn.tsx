// useRedirectIfNotLoggedIn.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectIfNotLoggedIn = () => {
    const storedUserString = localStorage.getItem('user');
    const user = storedUserString ? JSON.parse(storedUserString) : {}; // Provide a 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.isBasicInfoFilled) {
            // Redirect to login or BasicInfo based on the user's status
            navigate('/basic-info');
        }
    }, [user, navigate]);
};

export default useRedirectIfNotLoggedIn;
