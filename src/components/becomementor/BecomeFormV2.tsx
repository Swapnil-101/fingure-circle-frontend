import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { toast } from "react-toastify";

import baseURL from '@/config/config';

// Dummy data for degrees and expertise
const dummyData = {
    degrees: [
        'B.Sc. Computer Science',
        'B.Tech Information Technology',
        'B.E. Mechanical Engineering',
        'B.A. Psychology',
        'B.Com. Accounting',
        'M.Sc. Data Science',
        'M.Tech Computer Science',
        'MBA Business Administration',
        'M.A. Economics',
        'M.E. Mechanical Engineering',
        'Ph.D. Computer Science',
        'Ph.D. Physics'
    ],
    expertise: [
        'Web Development',
        'Data Science',
        'Machine Learning',
        'Cloud Computing',
        'DevOps',
        'Cybersecurity',
        'UI/UX Design',
        'Mobile Development',
        'Blockchain',
        'Artificial Intelligence',
        'Software Architecture',
        'Project Management'
    ]
};

// Type for the form data
interface FormData {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    expertise: string;
    degree: string;
    background: string;
    fee: string;
    milestones: string;
    profileImage: File | null;
    resume: File | null;
}

const BecomeFormV2 = () => {
    const [loading, setLoading] = useState(false);

    const notifySuccess = () => toast.success("Your application has been submitted successfully!");
    const notifyError = (error: any) => toast.error(`Error: ${error}`);

    // Form state
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        linkedin: "",
        expertise: "",
        degree: "",
        background: "",
        fee: "",
        milestones: "",
        profileImage: null,
        resume: null,
    });

    // Milestone options
    const milestoneOptions = ['3', '4', '5'];

    // Handle input changes
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        field: "profileImage" | "resume"
    ) => {
        const file = e.target.files?.[0] || null;
        setFormData((prev) => ({ ...prev, [field]: file }));
    };

    // Handle select changes
    const handleSelect = (value: string, name: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const uploadToCloudinary = async (file: File): Promise<string> => {
        const cloudName = "dpwysillm"; // Your Cloudinary cloud name
        const uploadPreset = "figurecircule"; // Your Cloudinary upload preset
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);

        try {
            const response = await axios.post(cloudinaryUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Ensure this header is set for file uploads
                },
            });

            return response.data.secure_url; // Return the Cloudinary URL of the uploaded file
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            throw new Error("Failed to upload file.");
        }
    };
    // Handle form submission

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You must be logged in to submit this form.");
            return;
        }

        try {
            setLoading(true);

            const profileImageUrl = formData.profileImage
                ? await uploadToCloudinary(formData.profileImage)
                : null;
            const resumeUrl = formData.resume
                ? await uploadToCloudinary(formData.resume)
                : null;

            const formDataToSubmit = {
                ...formData,
                profile_picture: profileImageUrl,
                resume: resumeUrl,
            };

            const response = await axios.post(`${baseURL}/add_new_mentor`, formDataToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log("Form submitted successfully:", response.data);
            notifySuccess()
            // alert("Your application has been submitted successfully!");
        } catch (error) {
            console.error("Error submitting form:", error);
            notifyError(error)
            // alert("Failed to submit the form. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto p-4">
            <Card>
                <CardHeader>
                    <CardTitle>Become a Mentor</CardTitle>
                    <CardDescription>
                        Fill out the form below to join our mentorship platform. Share your expertise
                        and set your mentorship fee. Approved mentors will help users achieve their
                        goals by working through milestone-based sessions.
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Personal Information Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Personal Information</h3>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number (optional)</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 (555) 000-0000"
                                />
                            </div>
                        </div>


                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>



                            <div className="space-y-2">
                                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                <Input
                                    id="linkedin"
                                    name="linkedin"
                                    value={formData.linkedin}
                                    onChange={handleChange}
                                    placeholder="linkedin.com/in/yourprofile"
                                    required
                                />
                            </div>
                        </div>

                    </div>

                    {/* Expertise Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Your Expertise and Background</h3>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="expertise">Primary Expertise Area</Label>
                                <Select
                                    name="expertise"
                                    onValueChange={(value) => handleSelect(value, 'expertise')}
                                    value={formData.expertise}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your expertise" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dummyData.expertise.map((expertise) => (
                                            <SelectItem key={expertise} value={expertise}>
                                                {expertise}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="degree">Highest Degree Achieved</Label>
                                <Select
                                    name="degree"
                                    onValueChange={(value) => handleSelect(value, 'degree')}
                                    value={formData.degree}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your degree" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dummyData.degrees.map((degree) => (
                                            <SelectItem key={degree} value={degree}>
                                                {degree}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                        <div className="space-y-2">
                            <Label htmlFor="background">Brief Background Description</Label>
                            <Textarea
                                id="background"
                                name="background"
                                value={formData.background}
                                onChange={handleChange}
                                placeholder="Share your relevant experience and achievements (250-500 words)"
                                className="h-32"
                                required
                            />
                        </div>
                    </div>

                    {/* Fee Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Fee Structure</h3>

                        <div className='grid grid-cols-2 gap-4' >
                            <div className="space-y-2">
                                <Label htmlFor="fee">Total Mentorship Fee</Label>
                                <Input
                                    id="fee"
                                    name="fee"
                                    type="number"
                                    value={formData.fee}
                                    onChange={handleChange}
                                    placeholder="Enter amount (will be divided by milestones)"
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="milestones">Preferred Number of Milestones</Label>
                                <Select
                                    name="milestones"
                                    onValueChange={(value) => handleSelect(value, 'milestones')}
                                    value={formData.milestones}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select number of milestones" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {milestoneOptions.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option} milestones
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                    </div>

                    {/* Upload Section */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Required Documents</h3>

                        <div className='grid grid-cols-2 gap-4'>
                            <div className="space-y-2">
                                <Label htmlFor="profile">Profile Picture</Label>
                                <Input
                                    id="profile"
                                    type="file"
                                    accept="image/*"
                                    className="cursor-pointer"
                                    onChange={(e) => handleFileChange(e, "profileImage")}
                                    // onChange={(e) => handleFileChange(e, "resume")}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="resume">Resume or Portfolio</Label>
                                <Input
                                    id="resume"
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="cursor-pointer"
                                    onChange={(e) => handleFileChange(e, "resume")}
                                    required
                                />
                            </div>
                        </div>

                    </div>
                </CardContent>


                <CardFooter>
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </Button>
                </CardFooter>
            </Card>
        </form>
    );
};

export default BecomeFormV2;