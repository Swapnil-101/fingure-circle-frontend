import baseURL from '@/config/config';
import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';



const BasicInfo: React.FC = () => {
    // const navigate = useNavigate();

    const user = useSelector((state: any) => state.user.data);

    console.log('User from Redux:', user);
    const token = localStorage.getItem('token');
    const [userInfo, setUserInfo] = useState({
        firstname: '',
        lastname: '',
        schoolname: '',
        bachelorsDegree: '',
        masterdegree: '',
        certification: '',
        activity: ['', '', ''],
        country: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        if (field === 'activity') {
            // Special handling for the 'activity' field (array of strings)
            const index = parseInt(e.target.name, 10);
            const updatedActivity = [...userInfo.activity];
            updatedActivity[index] = e.target.value;
            setUserInfo({ ...userInfo, activity: updatedActivity });
        } else {
            setUserInfo({ ...userInfo, [field]: e.target.value });
        }
    };

    const handleSave = async () => {
        try {
            await axios.post(`${baseURL}/api/info`, userInfo, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            // Remove token from localStorage
            localStorage.removeItem('token');

            // Reload the page
            window.location.reload();
        } catch (error) {
            // Handle API request errors (e.g., display an error message)
            console.error('Error:', error);
        }
    };
    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder='FirstName'
                        value={userInfo.firstname}
                        onChange={(e) => handleInputChange(e, 'firstname')}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="emailAddress">
                        Last Name
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        placeholder='Lastname'
                        name="lastName"
                        value={userInfo.lastname}
                        onChange={(e) => handleInputChange(e, 'lastname')}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                        School Name
                    </label>
                    <input
                        type="text"
                        id="schlname"
                        placeholder='Schoolname'
                        name="schlname"
                        value={userInfo.schoolname}
                        onChange={(e) => handleInputChange(e, 'schoolname')}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>



                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">
                        Bachelors Degree
                    </label>
                    <input
                        type="text"
                        id="bachldegre"
                        placeholder='BachelorsDegree'
                        name="bachldegre"
                        value={userInfo.bachelorsDegree}
                        onChange={(e) => handleInputChange(e, 'bachelorsDegree')}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">
                        Masters Degree
                    </label>
                    <input
                        type="text"
                        id="master"
                        placeholder='Masterdegree'
                        name="master"
                        value={userInfo.masterdegree}
                        onChange={(e) => handleInputChange(e, 'masterdegree')}

                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">
                        Certifications
                    </label>
                    <input
                        type="text"
                        id="certi"
                        name="certi"
                        placeholder='Certification'
                        value={userInfo.certification}
                        onChange={(e) => handleInputChange(e, 'certification')}

                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="activity">
                        Activity
                    </label>
                    <div className='flex gap-[2rem]'>
                        {userInfo.activity.map((activity, index) => (
                            <input
                                type="text"
                                name={index.toString()}
                                value={activity}
                                placeholder='Activity'
                                onChange={(e) => handleInputChange(e, 'activity')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                key={index}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="passwordConfirmation">
                        Country
                    </label>
                    <input
                        type="text"
                        id="count"
                        name="count"
                        placeholder='Country'
                        value={userInfo.country}
                        onChange={(e) => handleInputChange(e, 'country')}

                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button
                    onClick={handleSave}
                    className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                    Save
                </button>
            </div>


        </section>
    );
};

export default BasicInfo;
