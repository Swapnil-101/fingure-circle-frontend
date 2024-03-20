
import { FutureMain } from '@/components/future/FutureMain';
import Recom from '@/components/future/Recom';
import baseURL from '@/config/config';
import axios from 'axios';
import { useEffect, useState } from 'react';

const FutureProfile = () => {
    const [infoData, setInfoData] = useState<any>();

    useEffect(() => {
        // Fetch data when the component mounts
        const fetchInfoData = async () => {
            try {
                // Replace 'user-id' with the actual user ID from localStorage

                const name = localStorage.getItem('token')
                if (true) {
                    const response = await axios.get(`${baseURL}/user_details`, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        }
                    });
                    setInfoData(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, []);
    return (
        <div>
            <FutureMain infoData={infoData} />
            <Recom infoData={infoData} />
        </div>
    )
}

export default FutureProfile