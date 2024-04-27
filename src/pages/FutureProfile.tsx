
import { FutureMain } from '@/components/future/FutureMain';
import Recom from '@/components/future/Recom';
import baseURL from '@/config/config';
// import baseURL from '@/config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';

const FutureProfile = () => {
    const [infoData, setInfoData] = useState<any>([]);
    const [infoData2, setInfoData2] = useState<any>("");
    const [infoGetValue, setInfoGetValue] = useState<any>("");

    // const [usernames, setUserNames] = useState<any>();

    console.log("futureprofle==>", infoData2)

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
                    // const username = localStorage.getItem('userlocaldata')
                    // setUserNames(JSON.parse(username))

                    // let point=username;
                    // console.log("username==>", usernames?.username                )

                    if (true) {
                        const response = await axios.put(`${baseURL}/add_stream_chosen`, {
                            "stream_chosen": infoData2
                        }, {
                            headers: {
                                'Authorization': `Bearer ${token}`,
                            },

                        });
                        console.log(response)
                        // setCertifcate(JSON.parse(response.data.ans));
                    }
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchInfoData();
        }
        // Fetch data when the component mounts

    }, [infoData2]);



    return (
        <div>
            <FutureMain setInfoData2={setInfoData2} infoData={infoData} />
            <Recom infoGetValue={infoGetValue} infoData2={infoData2} setInfoData2={setInfoData2} infoData={infoData} />
        </div>
    )
}

export default FutureProfile