

import React, { useState, useRef, useEffect } from 'react';

import useRedirectIfNotLoggedIn from '@/customHooks/useRedirectIfNotLoggedIn';
// import React from 'react'

interface SchoolDetailProps {
    label: string;
    value: string;
    // You can add other necessary props for SVG or additional features
}
const SchoolDetail: React.FC<SchoolDetailProps> = ({ label, value }) => (
    <div className="w-full mb-4 md:w-2/5">
        <div className="flex">
            <span className="mr-3 text-gray-500 dark:text-gray-400">
                {/* Add your SVG content */}
            </span>
            <div>
                <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
                <h2 className="text-base font-semibold text-gray-700 dark:text-gray-400">{value}</h2>
            </div>
        </div>
    </div>
);

const Mentor = () => {
    //basic info page check hook
    useRedirectIfNotLoggedIn();
    const [isMentorClicked, setMentorClicked] = useState(false);
    const [isMobileScreen, setIsMobileScreen] = useState(false);

    console.log("maindata", isMobileScreen)

    useEffect(() => {
        console.log("maindatacc")

        const handleResize = () => {
            setIsMobileScreen(window.innerWidth < 1024);
        };

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            <h1 className='text-center text-2xl font-bold text-[#1c2533] mb-4'>Hire An Expert based on Your Need</h1>
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    placeholder="Search"
                    className="block mt-2 w-[25rem] placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
                />
            </div>
            <div className={`grid ${isMentorClicked ? 'grid-cols-3' : 'grid-cols-1'} justify-items-start my-10`}>
                {/* Mentor List */}
                <div className={`px-4 ${isMentorClicked ? 'mx-0' : 'mx-auto'} sm:max-w-xl md:max-w-full lg:w-full xl:w-4/6 md:px-4 justify-self-end`}>
                    <div className="grid gap-8 cols-gap-5 lg:grid-cols-1 ">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="relative p-px overflow-hidden transition duration-300 transform border rounded shadow-sm hover:scale-105 group hover:shadow-xl">
                                <div className="absolute bottom-0 left-0 w-full h-1 duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                                <div className="absolute bottom-0 left-0 w-1 h-full duration-300 origin-bottom transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                                <div className="absolute top-0 left-0 w-full h-1 duration-300 origin-right transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100" />
                                <div className="absolute bottom-0 right-0 w-1 h-full duration-300 origin-top transform scale-y-0 bg-deep-purple-accent-400 group-hover:scale-y-100" />
                                <div className="relative p-5 bg-white rounded-sm">
                                    <div className="flex flex-col mb-2 lg:items-center lg:flex-row">
                                        <div className="flex items-center justify-center w-10 h-10 mb-4 mr-2 rounded-full bg-indigo-50 lg:mb-0">
                                            {/* SVG Icon */}
                                        </div>
                                        <h6 className="font-semibold leading-5">Title {item}</h6>
                                    </div>
                                    <p className="mb-2 text-sm text-gray-900">
                                        Description for item {item}.
                                    </p>

                                    {isMobileScreen ?
                                        <a
                                            href="/view-expert"
                                            className="inline-flex items-center text-sm font-semibold cursor-pointer transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                        >
                                            Learn more
                                        </a> :
                                        <a
                                            onClick={() => { setMentorClicked(true) }}
                                            className="inline-flex items-center text-sm font-semibold cursor-pointer transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                                        >
                                            Learn more
                                        </a>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {
                    isMentorClicked &&
                    // Mentor Details
                    <div className='col-span-2'>
                        <section className="font-poppins dark:bg-gray-800">
                            <div className="max-w-6xl px-4 mx-auto">
                                <div className="grid grid-cols-2">
                                    <div className="w-full px-4 ">
                                        <div className="mb-6">
                                            <div>
                                                <img className="object-cover w-32 h-32 rounded-full ring-gray-300" src="https://i.postimg.cc/0jwyVgqz/Microprocessor1-removebg-preview.png" alt="ProfilePic" />
                                                <span className="px-2.5 py-0.5 text-xs text-blue-600 bg-blue-100 dark:bg-gray-700 rounded-xl dark:text-gray-200">
                                                    Mentor/Expert
                                                </span>
                                            </div>
                                            <div>
                                                <h2 className="max-w-xl mt-6 mb-6 text-xl font-semibold leading-loose tracking-wide text-gray-700 md:text-2xl dark:text-gray-300">
                                                    Name: Swapnil Tiwari
                                                </h2>
                                                <div className="flex flex-wrap items-center mb-6">
                                                    <ul className="flex mb-4 mr-2 lg:mb-0">
                                                        {/* Add your star icons */}
                                                    </ul>
                                                    <a className="mb-4 text-xs underline hover:text-blue-600 dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0" href="#">
                                                        View Profile
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Mentor/Expert Details</h2>
                                            <div className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                                                <div className="p-3 lg:p-5">
                                                    <div className="p-2 rounded-xl lg:p-6 dark:bg-gray-800 bg-gray-50">
                                                        <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
                                                            <SchoolDetail label="School Stream" value="Science" />
                                                            <SchoolDetail label="Bachelors" value="B.Tech" />
                                                            <SchoolDetail label="Masters" value="M.Tech" />
                                                            <SchoolDetail label="Country" value="India" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-6">
                                            <h2 className="mb-2 text-lg font-bold text-gray-700 dark:text-gray-400">Description :</h2>
                                            <p className="text-base text-gray-500 dark:text-gray-400">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur molestiae repudiandae neque ullam modi eos libero vel magni saepe totam obcaecati ut, dolorum, sit, tempore nisi blanditiis nostrum deleniti ipsa!
                                            </p>
                                        </div>
                                    </div>
                                    {/* Pricing */}
                                    <div className="px-4 mx-auto ml-4 sm:max-w-xl md:max-w-full lg:max-w-screen-xl">
                                        <div className=" max-w-md gap-10 row-gap-5 sm:row-gap-10 lg:max-w-screen-md  sm:mx-auto flex justify-center items-center">
                                            <div className="flex flex-col justify-between p-5 bg-white border rounded shadow-sm">
                                                <div className="mb-6">
                                                    <div className="flex items-center justify-between pb-6 mb-6 border-b">
                                                        <div>
                                                            <p className="text-sm font-bold tracking-wider uppercase">
                                                                Personal use
                                                            </p>
                                                            <p className="text-5xl font-extrabold">50$</p>
                                                        </div>
                                                        <div className="flex items-center justify-center w-24 h-24 rounded-full bg-blue-gray-50">
                                                            <svg
                                                                className="w-10 h-10 text-gray-600"
                                                                viewBox="0 0 24 24"
                                                                strokeLinecap="round"

                                                            >
                                                                <path
                                                                    d="M12,7L12,7 c-1.657,0-3-1.343-3-3v0c0-1.657,1.343-3,3-3h0c1.657,0,3,1.343,3,3v0C15,5.657,13.657,7,12,7z"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                />
                                                                <path
                                                                    d="M15,23H9v-5H7v-6 c0-1.105,0.895-2,2-2h6c1.105,0,2,0.895,2,2v6h-2V23z"
                                                                    fill="none"
                                                                    stroke="currentColor"
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className="mb-2 font-bold tracking-wide">Features</p>
                                                        <ul className="space-y-2">
                                                            <li className="flex items-center">
                                                                <div className="mr-2">
                                                                    <svg
                                                                        className="w-4 h-4 text-deep-purple-accent-400"
                                                                        viewBox="0 0 24 24"
                                                                        strokeLinecap="round"

                                                                    >
                                                                        <polyline
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            points="6,12 10,16 18,8"
                                                                        />
                                                                        <circle
                                                                            cx="12"
                                                                            cy="12"
                                                                            fill="none"
                                                                            r="11"
                                                                            stroke="currentColor"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <p className="font-medium text-gray-800">
                                                                    10 deploys per day
                                                                </p>
                                                            </li>
                                                            <li className="flex items-center">
                                                                <div className="mr-2">
                                                                    <svg
                                                                        className="w-4 h-4 text-deep-purple-accent-400"
                                                                        viewBox="0 0 24 24"
                                                                        strokeLinecap="round"

                                                                    >
                                                                        <polyline
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            points="6,12 10,16 18,8"
                                                                        />
                                                                        <circle
                                                                            cx="12"
                                                                            cy="12"
                                                                            fill="none"
                                                                            r="11"
                                                                            stroke="currentColor"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <p className="font-medium text-gray-800">10 GB of storage</p>
                                                            </li>
                                                            <li className="flex items-center">
                                                                <div className="mr-2">
                                                                    <svg
                                                                        className="w-4 h-4 text-deep-purple-accent-400"
                                                                        viewBox="0 0 24 24"
                                                                        strokeLinecap="round"

                                                                    >
                                                                        <polyline
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            points="6,12 10,16 18,8"
                                                                        />
                                                                        <circle
                                                                            cx="12"
                                                                            cy="12"
                                                                            fill="none"
                                                                            r="11"
                                                                            stroke="currentColor"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <p className="font-medium text-gray-800">Unlimited domains</p>
                                                            </li>
                                                            <li className="flex items-center">
                                                                <div className="mr-2">
                                                                    <svg
                                                                        className="w-4 h-4 text-deep-purple-accent-400"
                                                                        viewBox="0 0 24 24"
                                                                        strokeLinecap="round"

                                                                    >
                                                                        <polyline
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            points="6,12 10,16 18,8"
                                                                        />
                                                                        <circle
                                                                            cx="12"
                                                                            cy="12"
                                                                            fill="none"
                                                                            r="11"
                                                                            stroke="currentColor"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <p className="font-medium text-gray-800">SSL Certificates</p>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <a
                                                        href="/"
                                                        className="inline-flex items-center justify-center w-full h-12 px-6 mb-4 font-medium tracking-wide text-white transition duration-200 bg-gray-800 rounded shadow-md hover:bg-gray-900 focus:shadow-outline focus:outline-none"
                                                    >
                                                        Start
                                                    </a>
                                                    <p className="text-sm text-gray-600">
                                                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                                        accusantium
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                }
            </div>
        </div>
    )
}

export default Mentor