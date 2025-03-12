import { FutureMain } from '@/components/future/FutureMain';
import baseURL from '@/config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';

const FutureProfile = () => {
    const [infoData, setInfoData] = useState<any>([]);
    const [infoData2, setInfoData2] = useState<any>("");
    const [infoGetValue, setInfoGetValue] = useState<any>("");
    const [threeData, setThreeData] = useState<any>([]);
    const [degree, setDegree] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(true); // New state for loading

    const [count, setCount] = useState<any>(0);
    useRedirectIfNotLoggedIn();

    const notifySuccess = (data: any) => toast.success(`Successfully Selected: ${data}`);
    const notifyError = (error: any) => toast.error(`Login failed: ${error}`);
    console.log("maindegree==>", infoData);

    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}";
        setDegree(JSON.parse(degree));
    }, []);

    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
    
                const response = await axios.get(
                    `https://swapnil-101-course-recommend.hf.space/get_streams`,
                    { headers: { 'Authorization': `Bearer ${token}` } }
                );
    
                console.log("Raw ans field BEFORE parsing:", response.data.ans);
    
                let rawData = response.data.ans;
    
                // Ensure the data is a properly formatted JSON string
                if (typeof rawData === "string") {
                    try {
                        let parsedData = JSON.parse(rawData);
                        console.log("Parsed Data:", parsedData);
    
                        // Ensure it's a 1D array
                        setInfoData(Array.isArray(parsedData) ? parsedData : []);
                    } catch (jsonError) {
                        console.error("Error parsing JSON:", jsonError);
                    }
                } else {
                    console.error("Unexpected ans format:", rawData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };
    
        fetchInfoData();
    }, []);
    
    
    
    
    
    
    

    useEffect(() => {
        if (degree) {
            const fetchInfoData = async () => {
                try {
                    const name = localStorage.getItem('token');
                    if (name) {
                        const response = await axios.post(`https://swapnil-101-course-recommend.hf.space/get_three_streams`, {
                            "degree": degree?.masters_degree || degree?.bachelors_degree
                        }, {
                            headers: {
                                'Authorization': `Bearer ${name}`,
                            },
                        });
                        console.log("checkingmain==>", JSON.parse(response.data.ans));
                        setThreeData(JSON.parse(response.data.ans));
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                } finally {
                    setIsLoading(false); // Set loading to false after fetching
                }
            };
            fetchInfoData();
        }
    }, [degree]);

    useEffect(() => {
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/chosen_stream`, {
                    headers: {
                        'Authorization': `Bearer ${name}`,
                    }
                });
                const chosenStream = response.data.chosen_stream;
                setInfoGetValue(chosenStream);
                console.log("checking==>", chosenStream);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading to false after fetching
            }
        };

        fetchInfoData();
    }, []);

    useEffect(() => {
        if (infoData2) {
            const fetchInfoData = async () => {
                try {
                    const token = localStorage.getItem('token');
                    if (token) {
                        const response = await axios.post(`${baseURL}/update_user_details_diff`, {
                            stream_name: infoData2
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });

                        setCount(count + 1);
                       
                        notifySuccess(infoData2);
                        console.log(response);
                    }
                } catch (error: any) {
                    console.error('Error fetching data:', error);
                    const token = localStorage.getItem('token');
                    if (error.response && error.response.status === 500) {
                        try {
                            const streamResponse = await axios.post(`${baseURL}/streams`, {
                                name: infoData2
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            setCount(count + 1);
                            console.log('Stream response:', streamResponse);
                            fetchInfoData();
                        } catch (streamError) {
                            console.error('Error fetching streams:', streamError);
                        }
                    }
                } finally {
                    setIsLoading(false); // Set loading to false after fetching
                }
            };

            fetchInfoData();
        }
    }, [infoData2]);

    if (isLoading) {
        return <div>Loading...</div>; // Render a loader while data is being fetched
    }

    return (
        <div>
            <FutureMain  infoGetValue={infoGetValue} degree={degree} infoData2={infoData2} setInfoData2={setInfoData2} infoData={infoData} threeData={threeData} />
            <ToastContainer />
        </div>
    );
};

export default FutureProfile;