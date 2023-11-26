

import { MentorList } from '@/components/mentor/MentorList';
import { Pricing } from '@/components/mentor/Pricing'

import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
// import React from 'react'

const Mentor = () => {
    //basic info page check hook
    useRedirectIfNotLoggedIn();
    return (
        <div>
            <MentorList />
        </div>
    )
}

export default Mentor