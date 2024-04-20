import axios from 'axios';
import React, { useState } from 'react';
import { toast } from "react-toastify";



interface AppointmentFormProps { }

const BecomeForm: React.FC<AppointmentFormProps> = () => {

    const notifySuccess = () => toast.success("Request for becoming mentor sent successfully!");
    const notifyError = (error: any) => toast.error(`Error: ${error}`);

    const [expertData, setExpertData] = useState({
        mentor_name: '',
        qualification: '',
        sender_email: '',
        experience: '',
        skills: '',
    })



    const token = localStorage.getItem('token');
    const handleFormSubmit = () => {
        axios.post('https://course-recommendation-0qom.onrender.com/add_mentor', expertData, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(response => {
                console.log('API response:', response.data);
                notifySuccess()
            })
            .catch((error) => {
                notifyError(error)
                console.error('Error sending data:', error);
            });
    };


    return (
        <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
            {/* <div className="mt-10 text-center font-bold">Contact Us</div> */}
            <div className="mt-3 text-center text-4xl font-bold">Become an Expert</div>
            <div className="p-8">
                <div className="">
                    {/* <label className="text-gray-700 dark:text-gray-200" htmlFor="username">
                        First Name
                    </label> */}

                </div>
                <div className=" my-6 flex gap-4">

                    <input
                        type="text"
                        name="name"
                        value={expertData.mentor_name}
                        onChange={(e) => setExpertData({ ...expertData, mentor_name: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Expertise Name"
                    />
                    <input
                        type="text"
                        name="Qualification"
                        value={expertData.qualification}
                        onChange={(e) => setExpertData({ ...expertData, qualification: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Qualification*"
                    />
                </div>
                <div className="flex gap-4">

                    <input
                        type="number"
                        name="yearofexp"
                        value={expertData.experience}
                        onChange={(e) => setExpertData({ ...expertData, experience: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Year of Experience*"
                    />
                    <input
                        type="text"
                        name="skill"
                        value={expertData.skills}
                        onChange={(e) => setExpertData({ ...expertData, skills: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Skill"
                    />
                </div>
                <div className="my-6 flex gap-4">
                    {/* <input
                        type="number"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="$ Coaching Session for 1st student*"
                    /> */}

                    <input
                        type="text"
                        name="email"
                        value={expertData.sender_email}
                        onChange={(e) => setExpertData({ ...expertData, sender_email: e.target.value })}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Email"
                    />

                    <div className="text-center">
                        <button
                            className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white"
                            onClick={handleFormSubmit}
                        >
                            Submit
                        </button>
                    </div>


                </div>

                {/* <textarea
                    name="textarea"
                    id="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    cols={30}
                    rows={10}
                    className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"
                    placeholder="Description of work"
                /> */}

            </div>
            {/* <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl pauseOnFocusLoss draggable pauseOnHover /> */}

        </div>
    );
};

export default BecomeForm;
