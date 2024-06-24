
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Recom {
    setInfoData2: any;
    infoData2: any;
    infoData: any;
    infoGetValue: any;
    degree: any;
}
const Recom: React.FC<Recom> = ({ degree }) => {
    console.log("checking==>", degree?.stream_name)
    const [data, setData] = useState<any>([]);
    const [certifcate, setCertifcate] = useState<any>([]);
    const [competition, setCompetition] = useState<any>([]);




    // course
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token')
                if (degree?.stream_name) {
                    const response = await axios.post(`https://swapnil-101-course-recommend.hf.space/get_course`, {
                        "stream": degree?.stream_name
                    }, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        },

                    });
                    setData(JSON.parse(response.data.ans));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, [degree?.stream_name]);

    // certificate
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token')
                if (degree?.stream_name) {
                    const response = await axios.post(`https://swapnil-101-course-recommend.hf.space/get_certificate`, {
                        "stream": degree?.stream_name
                    }, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        },

                    });
                    setCertifcate(JSON.parse(response.data.ans));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, [degree?.stream_name]);


    // competeipn
    useEffect(() => {
        // Fetch data when the component mounts
        const fetchInfoData = async () => {
            try {
                const name = localStorage.getItem('token')
                if (degree?.stream_name) {
                    const response = await axios.post(`https://swapnil-101-course-recommend.hf.space/get_competition`, {
                        "stream": degree?.stream_name
                    }, {
                        headers: {
                            'Authorization': `Bearer ${name}`,
                        },

                    });
                    setCompetition(JSON.parse(response.data.ans));
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchInfoData();
    }, [degree?.stream_name]);


    console.log("checkingallrunning==>", data)
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container px-6 py-10 mx-auto">
                <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
                    explore our <br /> awesome{' '}
                    <span className="underline decoration-blue-500">Recommendation</span>
                </h1>

                <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum quam
                    voluptatibus
                </p>

                <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                                />
                            </svg>
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                            Courses
                        </h1>

                        <p className="text-gray-500 dark:text-gray-300">
                            {data.map((i: any) => {
                                return (
                                    <p>{i}</p>
                                )
                            })}

                        </p>

                        <a
                            href="#"
                            className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </a>
                    </div>

                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                                />
                            </svg>
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                            Competition
                        </h1>

                        <p className="text-gray-500 dark:text-gray-300">
                            {competition.map((i: any) => {
                                return (
                                    <p>{i}</p>
                                )
                            })}

                        </p>

                        <a
                            href="#"
                            className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </a>
                    </div>

                    <div className="p-8 space-y-3 border-2 border-blue-400 dark:border-blue-300 rounded-xl">
                        <span className="inline-block text-blue-500 dark:text-blue-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                                />
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                                />
                            </svg>
                        </span>

                        <h1 className="text-xl font-semibold text-gray-700 capitalize dark:text-white">
                            Certification
                        </h1>

                        <p className="text-gray-500 dark:text-gray-300">
                            {certifcate.map((i: any) => {
                                return (
                                    <p>{i}</p>
                                )
                            })}

                        </p>

                        <a
                            href="#"
                            className="inline-flex p-2 text-blue-500 capitalize transition-colors duration-300 transform bg-blue-100 rounded-full rtl:-scale-x-100 dark:bg-blue-500 dark:text-white hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </a>
                    </div>


                    {/* Add similar feature components here... */}
                </div>
            </div>
        </section>
    )
}

export default Recom;