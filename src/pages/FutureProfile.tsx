
import { FutureMain } from '@/components/future/FutureMain';
import Recom from '@/components/future/Recom';
// import baseURL from '@/config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';

const FutureProfile = () => {
    const [infoData, setInfoData] = useState<any>([]);
    const [infoData2, setInfoData2] = useState<any>([]);
    console.log("futureprofle==>", infoData)

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
    return (
        <div>
            <FutureMain setInfoData2={setInfoData2} infoData={infoData} />
            <Recom infoData2={infoData2} setInfoData2={setInfoData2} infoData={infoData} />
        </div>
    )
}

export default FutureProfile