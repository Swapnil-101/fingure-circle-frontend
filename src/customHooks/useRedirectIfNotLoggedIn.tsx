// useRedirectIfNotLoggedIn.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRedirectIfNotLoggedIn = () => {
    const storedUserString = localStorage.getItem('user');
    console.log("main",storedUserString)
    const user = storedUserString ? JSON.parse(storedUserString) : {}; // Provide a 
    const navigate = useNavigate();

    useEffect(() => {
        if (!user?.data_filled) {
            // Redirect to login or BasicInfo based on the user's status
            navigate('/basic-info');
        }
    }, [user, navigate]);
};

export default useRedirectIfNotLoggedIn;
