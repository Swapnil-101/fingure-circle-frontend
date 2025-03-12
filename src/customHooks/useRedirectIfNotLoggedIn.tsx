import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useRedirectIfNotLoggedIn = () => {
    const navigate = useNavigate();

    // Initialize state with values from localStorage
    const [user, setUser] = useState(() => {
        const storedUserString = localStorage.getItem("user");
        return storedUserString ? JSON.parse(storedUserString) : null;
    });

    const [userTwo, setUserTwo] = useState(() => {
        const storedDegreeString = localStorage.getItem("degree");
        return storedDegreeString ? JSON.parse(storedDegreeString) : null;
    });

    // Debugging logs
    console.log("User from localStorage:", user);
    console.log("Degree from localStorage:", userTwo);

    // Function to update user state when localStorage changes
    const updateUserFromStorage = () => {
        const updatedUserString = localStorage.getItem("user");
        setUser(updatedUserString ? JSON.parse(updatedUserString) : null);
    };

    const updateUserTwoFromStorage = () => {
        const updatedUserTwoString = localStorage.getItem("degree");
        setUserTwo(updatedUserTwoString ? JSON.parse(updatedUserTwoString) : null);
    };

    // Sync state with localStorage changes within the same tab
    useEffect(() => {
        const handleStorageChange = () => {
            updateUserFromStorage();
            updateUserTwoFromStorage();
        };

        // Listen for changes in localStorage
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    // Update state when localStorage is modified in the same tab
    useEffect(() => {       
            updateUserFromStorage();
            updateUserTwoFromStorage();
    }, []);

    // Redirect if data is incomplete
    useEffect(() => {
        if ( userTwo?.data_filled === false) {
            console.log("Redirecting to /basic-info...");
            navigate("/basic-info");
        }
    }, [user, userTwo, navigate]); // Added `userTwo` as a dependency

};

export default useRedirectIfNotLoggedIn;
