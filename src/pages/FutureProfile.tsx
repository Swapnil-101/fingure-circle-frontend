
import { FutureMain } from '@/components/future/FutureMain';
// import Recom from '@/components/future/Recom';
import baseURL from '@/config/config';
// import baseURL from '@/config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from "react-toastify";

const FutureProfile = () => {
    const [infoData, setInfoData] = useState<any>([]);
    const [infoData2, setInfoData2] = useState<any>("");
    const [infoGetValue, setInfoGetValue] = useState<any>("");
    const [threeData, setThreeData] = useState<any>([]);
    const [degree, setDegree] = useState<any>();

    const notifySuccess = (data: any) => toast.success(`Suceessfully Selected: ${data}`)
    const notifyError = (error: any) => toast.error(`Login failed: ${error}`);
    console.log("maindegree==>", degree)


    useEffect(() => {
        const degree = localStorage.getItem('degree') || "{}"
        setDegree(JSON.parse(degree))
    }, [])

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchInfoData = async () => {
            try {
                // Replace 'user-id' with the actual user ID from localStorage

                const name = localStorage.getItem('token')
                if (true) {
                    const response = await axios.get(`https://swapnil-101-course-recommend.hf.space/get_streams`, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        }
                    });
                    console.log("checking==>", JSON.parse(response.data.ans))
                    setInfoData(JSON.parse(response.data.ans));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, []);


    useEffect(() => {

        if (degree) {
            const fetchInfoData = async () => {
                try {
                    const name = localStorage.getItem('token')
                    if (true) {
                        const response = await axios.post(`https://swapnil-101-course-recommend.hf.space/get_three_streams`, {
                            "degree": degree?.masters_degree || degree?.bachelors_degree
                        }, {
                            headers: {
                                'Authorization': `Bearer ${name}`,
                            },

                        });
                        console.log("checingmain==>", JSON.parse(response.data.ans))
                        setThreeData(JSON.parse(response.data.ans));
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchInfoData();
        }



    }, [degree]);



    useEffect(() => {
        // Fetch data when the component mounts
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token');
                const response = await axios.get(`${baseURL}/chosen_stream`, {
                    headers: {
                        'Authorization': `Bearer ${name}`,
                    }
                });
                const chosenStream = response.data.chosen_stream;
                setInfoGetValue(chosenStream); // Update the state with the fetched data
                console.log("checking==>", chosenStream);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, []);






    // https://course-recommendation-0qom.onrender.com/chosen_stream


    useEffect(() => {


        if (infoData2) {
            const fetchInfoData = async () => {
                try {
                    const token = localStorage.getItem('token');

                    if (true) {
                        const response = await axios.post(`${baseURL}/update_user_details_diff`, {
                            stream_name: infoData2
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },
                        });
                        notifySuccess(infoData2)
                        console.log(response);

                        // setCertifcate(JSON.parse(response.data.ans));
                    }
                } catch (error: any) {
                    console.error('Error fetching data:', error);
                    const token = localStorage.getItem('token');

                    if (error.response && error.response.status === 500) {
                        try {
                            // Agar 500 Internal Server Error aata hai, to `/streams` endpoint ko call karein
                            const streamResponse = await axios.post(`${baseURL}/streams`, {
                                name: infoData2
                            }, {
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                },
                            });
                            console.log('Stream response:', streamResponse);
                            // Ab page refresh karein, yeh aapke application ke depend karta hai kaise implement kiya hai
                            fetchInfoData()
                        } catch (streamError) {
                            console.error('Error fetching streams:', streamError);
                            // Handle errors from /streams API call
                        }
                    }
                }
            };

            fetchInfoData(); // Call fetchInfoData function to initiate the process
        }
        // Fetch data when the component mounts

    }, [infoData2]);






    return (
        <div>
            <FutureMain infoGetValue={infoGetValue} degree={degree} infoData2={infoData2} setInfoData2={setInfoData2} infoData={infoData} threeData={threeData} />
        </div>
    )
}

export default FutureProfile