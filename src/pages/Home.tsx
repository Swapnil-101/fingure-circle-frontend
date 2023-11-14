
import BasicInformation from "@/components/home/BasicInformation"
import FindYourDreamProfile from "@/components/home/FindYourDreamProfile"
import MentorConatiner from "@/components/home/MentorContainer"
import SomeRecentQuestion from "@/components/home/SomeRecentQuestion"
import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
const Home = () => {
  //basic info page check hook
  useRedirectIfNotLoggedIn();
  return (
    <div className="mx-[1rem] flex flex-col gap-8">
      <div className="flex  justify-between flex-wrap gap-4 md:gap-0">
        <BasicInformation />
        <FindYourDreamProfile />
      </div>
      <MentorConatiner />
      <SomeRecentQuestion />
    </div>

  )
}

export default Home