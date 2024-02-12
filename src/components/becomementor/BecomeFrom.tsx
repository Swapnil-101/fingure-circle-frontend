import React, { useState } from 'react';

interface AppointmentFormProps { }

const BecomeForm: React.FC<AppointmentFormProps> = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [message, setMessage] = useState('');

    console.log(setSelectedOption2, setSelectedOption1)

    const handleFormSubmit = () => {
        // Handle form submission logic here
        console.log('Form submitted:', { fullName, email, selectedOption1, selectedOption2, message });
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
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Expertise in Industry"
                    />
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="What did you do"
                    />
                </div>
                <div className="flex gap-4">

                    <input
                        type="number"
                        name="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Year of Experience*"
                    />
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="Current Profile *"
                    />
                </div>
                <div className="my-6 flex gap-4">
                    <input
                        type="number"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="$ Coaching Session for 1st student*"
                    />

                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                        placeholder="course*"
                    />

                </div>

                <textarea
                    name="textarea"
                    id="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    cols={30}
                    rows={10}
                    className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-gray-300"
                    placeholder="Description of work"
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
        </div>
    );
};

export default BecomeForm;
