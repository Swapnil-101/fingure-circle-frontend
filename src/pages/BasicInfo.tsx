import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';

// Sample suggestions for each field
const suggestionsData = {
    bachelors: ['B.Sc. Computer Science', 'B.A. Psychology', 'B.Com. Accounting', 'B.E. Mechanical Engineering'],
    masters: ['M.Sc. Data Science', 'M.A. Economics', 'MBA', 'M.E. Civil Engineering'],
    certifications: ['PMP', 'AWS Certified Solutions Architect', 'Certified Ethical Hacker', 'Certified ScrumMaster']
};

const BasicInfo: React.FC = () => {
    const token = localStorage.getItem('token');
    const [userInfo, setUserInfo] = useState({
        first_name: '',
        last_name: '',
        school_name: '',
        bachelors_degree: '',
        masters_degree: '',
        certification: '',
        activities: ['', '', ''], // Three activity fields
        country: '',
    });

    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [activeField, setActiveField] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string, index?: number) => {
        const value = e.target.value;

        if (field === 'activities' && index !== undefined) {
            const updatedActivities = [...userInfo.activities];
            updatedActivities[index] = value;
            setUserInfo({ ...userInfo, activities: updatedActivities });
        } else {
            setUserInfo({ ...userInfo, [field]: value });
        }

        if (field === 'bachelors_degree' || field === 'masters_degree' || field === 'certification') {
            const fieldSuggestions = suggestionsData[field === 'bachelors_degree' ? 'bachelors' : field === 'masters_degree' ? 'masters' : 'certifications'];
            setSuggestions(fieldSuggestions.filter(suggestion => suggestion.toLowerCase().includes(value.toLowerCase())));
            setActiveField(field); // Set the active field to the one being typed in
        } else {
            setActiveField(null);
        }
    };

    const handleSuggestionClick = (field: string, suggestion: string) => {
        setUserInfo({ ...userInfo, [field]: suggestion });
        setActiveField(null); // Close the suggestions dropdown after selection
    };

    const handleSave = async () => {
        try {
            // Combine activities into a single comma-separated string
            const activities = userInfo.activities.join(', ');

            const dataToSend = {
                ...userInfo,
                activities
            };

            await axios.post(`${baseURL}/user_details`, dataToSend, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            // Remove token from localStorage
            localStorage.removeItem('token');

            // Reload the page
            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Basic Information</h2>

            {/* Personal Information Container */}
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div className="col-span-2">
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-white">Personal Information</h3>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="firstName">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={userInfo.first_name}
                                onChange={(e) => handleInputChange(e, 'first_name')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="lastName">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                placeholder="Last Name"
                                name="lastName"
                                value={userInfo.last_name}
                                onChange={(e) => handleInputChange(e, 'last_name')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                       
                    </div>
                </div>
            </div>

            {/* Education Container */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Share your educational background to help match opportunities aligned with your academic journey and expertise
                </h3>
                <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="schoolName">
                                School Name
                            </label>
                            <input
                                type="text"
                                id="schoolName"
                                placeholder="School Name"
                                name="schoolName"
                                value={userInfo.school_name}
                                onChange={(e) => handleInputChange(e, 'school_name')}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                            />
                        </div>

                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="bachelorsDegree">
                            Bachelors Degree
                        </label>
                        <input
                            type="text"
                            id="bachelorsDegree"
                            placeholder="Bachelors Degree"
                            name="bachelorsDegree"
                            value={userInfo.bachelors_degree}
                            onChange={(e) => handleInputChange(e, 'bachelors_degree')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                        {activeField === 'bachelors_degree' && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick('bachelors_degree', suggestion)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="mastersDegree">
                            Masters Degree
                        </label>
                        <input
                            type="text"
                            id="mastersDegree"
                            placeholder="Masters Degree"
                            name="mastersDegree"
                            value={userInfo.masters_degree}
                            onChange={(e) => handleInputChange(e, 'masters_degree')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                        {activeField === 'masters_degree' && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick('masters_degree', suggestion)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="relative">
                        <label className="text-gray-700 dark:text-gray-200" htmlFor="certifications">
                            Certifications
                        </label>
                        <input
                            type="text"
                            id="certifications"
                            placeholder="Certifications"
                            name="certifications"
                            value={userInfo.certification}
                            onChange={(e) => handleInputChange(e, 'certification')}
                            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                        />
                        {activeField === 'certification' && suggestions.length > 0 && (
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick('certification', suggestion)}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                                    >
                                        {suggestion}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>

            {/* Activities Container */}
            <div className="mt-6">
    <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
        List your activities to connect with others who share your interests and to receive tailored 
recommendations or coaching
    </h3>
    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        {userInfo.activities.map((activity, index) => (
            <div key={index}>
                <label className="text-gray-700 dark:text-gray-200" htmlFor={`activity${index}`}>
                    Activity {index + 1}
                </label>
                <input
                    type="text"
                    id={`activity${index}`}
                    placeholder={`Activity ${index + 1}`}
                    name={`activity${index}`}
                    value={activity}
                    onChange={(e) => handleInputChange(e, 'activities', index)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                />
            </div>
        ))}
    </div>
</div>

            {/* Country Container */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Country
                </h3>
                <div className="mt-4">
                    <label className="text-gray-700 dark:text-gray-200" htmlFor="country">
                        Country
                    </label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Country"
                        name="country"
                        value={userInfo.country}
                        onChange={(e) => handleInputChange(e, 'country')}
                        className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                    />
                </div>
            </div>

            {/* Save Button */}
            <div className="mt-6 flex justify-end">
                <button
                    onClick={handleSave}
                    className="px-6 py-3 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                    Save
                </button>
            </div>
        </section>
    );
};

export default BasicInfo;
