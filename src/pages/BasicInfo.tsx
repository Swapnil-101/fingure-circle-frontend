import React, { useState } from 'react';
import axios from 'axios';
import baseURL from '@/config/config';
import { useNavigate } from 'react-router-dom';

// Sample suggestions for each field
const suggestionsData = {
    bachelors: [
        'B.Sc. Computer Science',
        'B.A. Psychology',
        'B.Com. Accounting',
        'B.E. Mechanical Engineering',
        'B.Sc. Information Technology',
        'B.A. International Relations',
        'B.B.A. Business Administration',
        'B.Sc. Biotechnology',
        'B.A. Political Science',
        'B.Sc. Environmental Science',
        'B.Sc. Physics',
        'B.E. Electrical Engineering',
        'B.A. History',
        'B.Sc. Mathematics',
        'B.Arch. Architecture',
        'B.Sc. Nursing',
        'B.Sc. Chemistry',
        'B.Sc. Artificial Intelligence',
        'B.Sc. Software Engineering',
        'B.A. Sociology',
        'B.Sc. Data Science',
        'B.Sc. Economics',
        'B.Sc. Biomedical Science',
        'B.A. Linguistics',
        'B.A. Philosophy',
        'B.Sc. Agriculture',
        'B.Sc. Neuroscience',
        'B.Sc. Forensic Science',
        'B.Sc. Geology',
        'B.A. Anthropology',
        'B.A. Political Science',
        'B.Sc. Oceanography',
        'B.Sc. Aerospace Engineering',
        'B.A. Fine Arts',
        'B.Sc. Statistics',
        'B.E. Chemical Engineering',
        'B.Sc. Marine Biology',
        'B.A. Criminology',
        'B.A. Public Administration',
        'B.Sc. Sports Science',
        'B.A. Hospitality Management',
        'B.A. Social Work',
        'B.Sc. Zoology',
        'B.A. Geography',
        'B.A. Music',
        'B.A. Dance',
        'B.E. Electronics and Communication Engineering',
        'B.A. Theater Arts',
        'B.Sc. Genetics',
        'B.Sc. Renewable Energy',
        'B.Sc. Computational Biology',
        'B.Sc. Applied Physics',
        'B.A. Archaeology',
        'B.Sc. Veterinary Science',
        'B.Sc. Environmental Engineering',
        'B.Sc. Petroleum Engineering',
        'B.Sc. Cognitive Science',
        'B.A. Education',
        'B.Sc. Food Science',
        'B.A. Public Relations',
        'B.Sc. Biotechnology',
        'B.Sc. Fashion Design',
        'B.Sc. Hospitality and Tourism',
        'B.Sc. Nanotechnology',
        'B.A. Media Studies',
        'B.A. Journalism',
        'B.Sc. Aerospace Engineering',
        'B.Sc. Cybersecurity',
        'B.Sc. Quantum Computing',
        'B.Sc. Sustainable Development',
        'B.A. Ethics',
        'B.Sc. Earth Science',
        'B.Sc. Supply Chain Management',
        'B.A. Global Studies',
        'B.Sc. Civil Engineering',
        'B.Sc. Urban Planning',
        'B.Sc. Industrial Engineering',
        'B.Sc. Digital Marketing',
        'B.A. International Business',
        'B.A. Literature',
        'B.A. Communications',
        'B.A. Theology',
        'B.Sc. Fire Protection Engineering',
        'B.Sc. Materials Science and Engineering',
        'B.Sc. Nuclear Engineering',
        'B.A. Film Studies',
        'B.A. Art History',
        'B.A. Visual Arts',
        'B.A. Gender Studies',
        'B.A. Social Anthropology',
        'B.A. Fashion Communication',
        'B.A. Cultural Studies',
        'B.Sc. Mechanical Engineering Technology',
        'B.Sc. Information Systems',
        'B.Sc. Software Development'
    ],
    masters: [
        'M.Sc. Data Science',
        'M.A. Economics',
        'MBA',
        'M.E. Civil Engineering',
        'M.Sc. Artificial Intelligence',
        'M.A. International Development',
        'M.P.H. Public Health',
        'M.Sc. Cybersecurity',
        'M.Sc. Renewable Energy',
        'M.A. Journalism and Mass Communication',
        'M.Sc. Software Engineering',
        'M.Sc. Finance',
        'M.Sc. Robotics',
        'M.Ed. Education',
        'M.A. Sociology',
        'M.Des. Design',
        'LL.M. International Law',
        'M.P.A. Public Administration',
        'M.A. Anthropology',
        'M.Sc. Human-Computer Interaction',
        'M.Sc. Quantum Computing',
        'M.A. Political Science',
        'M.A. Archaeology',
        'M.Sc. Biomedical Engineering',
        'M.Sc. Supply Chain Management',
        'M.Sc. Sustainable Energy',
        'M.A. Linguistics',
        'M.Sc. Environmental Science',
        'M.A. History',
        'M.Sc. Machine Learning',
        'M.A. Cultural Anthropology',
        'M.A. Global Communication',
        'M.Sc. Urban Design',
        'M.A. Public Policy',
        'M.Sc. Biotechnology',
        'M.Sc. Forensic Science',
        'M.Sc. Nanotechnology',
        'M.Sc. Applied Physics',
        'M.A. Strategic Communication',
        'M.Sc. Biostatistics',
        'M.Sc. Clinical Psychology',
        'M.Sc. Data Analytics',
        'M.Sc. Public Health Nutrition',
        'M.A. International Relations',
        'M.Sc. Environmental Engineering',
        'M.Sc. Cognitive Science',
        'M.Sc. Geospatial Science',
        'M.A. Public Health',
        'M.Sc. Aerospace Engineering',
        'M.A. Human Resources Management',
        'M.Sc. Digital Marketing',
        'M.Sc. Mechanical Engineering',
        'M.Sc. Blockchain Technology',
        'M.A. Global Health',
        'M.Sc. Social Data Science',
        'M.Sc. Oceanography',
        'M.Sc. Cyber-Physical Systems',
        'M.A. Business Analytics',
        'M.Sc. Information Systems',
        'M.Sc. Petroleum Engineering',
        'M.Sc. Neuroscience',
        'M.A. Sustainable Development',
        'M.Sc. Data Engineering',
        'M.Sc. Smart Cities',
        'M.Sc. Cloud Computing',
        'M.A. Ethics and Leadership',
        'M.A. Education Policy',
        'M.A. Refugee and Migration Studies',
        'M.Sc. Biochemistry',
        'M.Sc. Molecular Biology',
        'M.A. Environmental Policy',
        'M.A. Conflict Resolution',
        'M.A. Philosophy',
        'M.Sc. Sports Management',
        'M.A. Advertising and Public Relations',
        'M.A. Creative Writing',
        'M.A. Digital Media',
        'M.A. Theater Arts',
        'M.A. Film and Television Studies',
        'M.A. Musicology',
        'M.A. Gender Studies',
        'M.Sc. Robotics Engineering',
        'M.Sc. Product Design',
        'M.Sc. Chemical Engineering',
        'M.A. Comparative Literature',
        'M.Sc. Materials Science',
        'M.A. International Trade',
        'M.Sc. Urban Planning',
        'M.A. Applied Linguistics',
        'M.A. Sociology of Education'
    ],
    certifications: [
        'PMP',
        'AWS Certified Solutions Architect',
        'Certified Ethical Hacker',
        'Certified ScrumMaster',
        'Google Certified Professional Data Engineer',
        'Cisco Certified Network Associate (CCNA)',
        'Microsoft Certified Azure Solutions Architect',
        'CISSP (Certified Information Systems Security Professional)',
        'Six Sigma Green Belt',
        'ITIL Foundation Certification',
        'CompTIA Security+',
        'Certified Information Security Manager (CISM)',
        'Google Cloud Professional Cloud Architect',
        'Oracle Certified Java Programmer',
        'Certified Kubernetes Administrator',
        'Salesforce Certified Administrator',
        'TOGAF Certification',
        'Certified Blockchain Expert',
        'Certified Data Privacy Solutions Engineer (CDPSE)',
        'Scrum Product Owner Certified (SPOC)',
        'AWS Certified DevOps Engineer',
        'Certified Network Security Specialist (CNSS)',
        'Certified Information Systems Auditor (CISA)',
        'Adobe Certified Expert (ACE)',
        'Certified in Risk and Information Systems Control (CRISC)',
        'Certified Java Developer',
        'Certified Business Analysis Professional (CBAP)',
        'Certified Information Technology Infrastructure Library (ITIL) Expert',
        'Certified Google Analytics Professional',
        'Google Cloud Machine Learning Engineer',
        'Certified Scrum Product Owner (CSPO)',
        'Certified Data Management Professional (CDMP)',
        'Certified Artificial Intelligence Engineer (CAIE)',
        'Microsoft Certified Solutions Developer (MCSD)',
        'Oracle Certified Master Java EE Enterprise Architect',
        'Red Hat Certified Engineer (RHCE)',
        'Certified Digital Marketing Professional',
        'Azure Security Engineer Associate',
        'Certified Penetration Testing Expert (CPTE)',
        'Certified Financial Planner (CFP)',
        'Certified Public Accountant (CPA)',
        'Microsoft Power BI Certification',
        'Cisco Certified Internetwork Expert (CCIE)',
        'Certified Internet of Things Professional (CIoTP)',
        'Certified Cloud Security Professional (CCSP)',
        'Certified Machine Learning Professional (CMLP)',
        'VMware Certified Professional (VCP)',
        'Certified Information Security Auditor (CISA)',
        'Microsoft Certified DevOps Engineer',
        'Oracle Cloud Infrastructure Certified Architect',
        'Google Cloud Certified Professional DevOps Engineer',
        'Certified Agile Leadership (CAL)',
        'Certified Lean Six Sigma Black Belt',
        'Certified in Governance of Enterprise IT (CGEIT)',
        'Tableau Desktop Certified Professional',
        'AWS Certified Machine Learning Specialty',
        'Certified Information Forensics Investigator (CIFI)',
        'Certified Data Scientist (CDS)',
        'Certified Network Defender (CND)',
        'Scrum Master Accredited Certification',
        'Microsoft Certified Dynamics 365 Developer',
        'Certified Artificial Intelligence Specialist (CAIS)',
        'Cisco Certified Design Expert (CCDE)',
        'Certified Web Developer (CWD)',
        'Certified Cloud Practitioner (AWS CCP)',
        'ITIL Managing Professional',
        'Microsoft Certified Cybersecurity Architect Expert',
        'Google Mobile Web Specialist Certification',
        'Certified Risk Management Professional (CRMP)',
        'Oracle Certified Associate (OCA)'
    ]
};

const BasicInfo: React.FC = () => {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

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
            // localStorage.removeItem('token');
            navigate('/');

            // Reload the page
            // window.location.reload();
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
        <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto">
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
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto">
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
                            <ul className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 max-h-48 overflow-y-auto">
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
