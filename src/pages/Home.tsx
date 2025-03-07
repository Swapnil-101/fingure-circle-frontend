
import Chat from "@/components/Chat";
import BasicInformation from "@/components/home/BasicInformation"
import FindYourDreamProfile from "@/components/home/FindYourDreamProfile"
import MentorConatiner from "@/components/home/MentorContainer"
import baseURL from "@/config/config";
// import SomeRecentQuestion from "@/components/home/SomeRecentQuestion"
// import baseURL from "@/config/config";
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
import axios from "axios";
// import axios from "axios";
import { useEffect, useState } from "react";
const Home = () => {
  //basic info page check hook
  useRedirectIfNotLoggedIn();
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
    <div className="mx-[1rem] flex flex-col gap-8">
      <div className="flex  justify-between  gap-4 md:gap-[1rem]">
        <BasicInformation />
        <FindYourDreamProfile infoData={infoData} />
      </div>
      <MentorConatiner />
      <h1 className="max-w-xl mx-auto leading-tight text-3xl font-bold tracking-tight sm:text-center">Ask Your Questions</h1>
      <Chat />
      {/* <SomeRecentQuestion /> */}
    </div>

  )
}

export default Home