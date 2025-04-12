'use client'
import React, { useState, useEffect } from 'react'
import Layout from "../../components/Layout/Layout";
import Image from 'next/image';
import { BsThreeDots } from "react-icons/bs";
import MainThemeButton from '../../components/Buttons/MainThemeButton';
import ProfileSettingForm from '../../components/Profile/ProfileSettingForm';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/admin');
                const result = await response.json();
                if (result.success) {
                    setProfileData(result.data[0]);
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const tabs = [
        {
            text: 'Posts',
            component: <p className="text-black text-3xl font-semibold">Posts</p>
        },
        {
            text: 'About me',
            component: <p className="text-black text-3xl font-semibold">About me</p>
        },
        {
            text: 'Setting',
            component: <ProfileSettingForm />
        },
    ];
    const [selectedIndex, setSelectedIndex] = useState(0);

    const details = {
        name: profileData?.name || 'Loading...',
        role: profileData?.role || 'Loading...',
        email: profileData?.email || 'Loading...',
        follwers: 150,
        placeStay: 140,
        reviews: 45,
        highlights: {
            title: 'Darwin Creative Agency Theme',
            description: 'A small river named Duden flows by their place and supplies it with necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
        }
    }

    return (
        <Layout>
            <div className="flex flex-col relative rounded-lg bg-white rounded-b-lg border-r border-gray-100 shadow-sm p-4">
                <div className="w-full rounded-lg overflow-hidden -mx-4 -mt-4">
                    <Image 
                        src={'https://picsum.photos/600/100'} 
                        alt='Cover image' 
                        width={1200} 
                        height={200} 
                        className='w-full h-[200px] object-cover' 
                        priority
                    />
                </div>

                <div className="absolute bottom-[40px] left-8">
                    <Image 
                        src={profileData?.avatar || 'https://picsum.photos/100/100'} 
                        alt='Profile picture' 
                        width={100} 
                        height={100} 
                        className='rounded-full object-cover' 
                        priority
                    />
                </div>

                <div className="pt-4 flex justify-between items-center">
                    <div className="flex gap-10 items-center ml-[120px]">
                        <div className="flex flex-col gap-1">
                            <p className="text-indigo-700 text-lg">{details.name}</p>
                            <p className="text-sm text-[#c2c2c2] font-medium">{details.role}</p>
                            {profileData?.location && (
                                <p className="text-sm text-[#c2c2c2] font-medium">{profileData.location}</p>
                            )}
                            {profileData?.phone && (
                                <p className="text-sm text-[#c2c2c2] font-medium">{profileData.phone}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-black text-lg">{details.email}</p>
                            <p className="text-sm text-[#c2c2c2] font-medium">{'Email'}</p>
                        </div>
                    </div>
                    <div className="bg-[#c2c2c2]/60 w-8 h-8 border border-indigo-700 flex justify-center items-center rounded-lg">
                        <BsThreeDots className='text-indigo-700' />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-5 mt-4 gap-4">
                <div className="col-span-2 flex flex-col gap-4">
                    {/* Details */}
                    <div className="rounded-lg bg-white rounded-b-lg border-r border-gray-100 shadow-sm flex flex-col gap-6 px-8 py-4">
                        <div className="flex items-center justify-around">
                            {details?.follwers && (
                                <div className="flex flex-col gap-1 items-center justify-center">
                                    <p className="text-black text-3xl font-semibold">{details?.follwers}</p>
                                    <p className="text-sm text-[#c2c2c2] font-semibold">{'Follwers'}</p>
                                </div>
                            )}
                            {details?.placeStay && (
                                <div className="flex flex-col gap-1 items-center justify-center">
                                    <p className="text-black text-3xl font-semibold">{details?.placeStay}</p>
                                    <p className="text-sm text-[#c2c2c2] font-semibold">{'Places Stay'}</p>
                                </div>
                            )}
                            {details?.placeStay && (
                                <div className="flex flex-col gap-1 items-center justify-center">
                                    <p className="text-black text-3xl font-semibold">{details?.reviews}</p>
                                    <p className="text-sm text-[#c2c2c2] font-semibold">{'Reviews'}</p>
                                </div>
                            )}
                        </div>
                        <div className="col-span-3 mx-auto flex gap-3 items-center justify-center">
                            <MainThemeButton text={'Follow'} />
                            <MainThemeButton text={'Send Message'} />
                        </div>
                    </div>

                    {/* Today HighLights */}
                    <div className="rounded-lg bg-white rounded-b-lg border-r border-gray-100 shadow-sm p-4 flex flex-col gap-4">
                        <div className="">
                            <p className="text-indigo-700 font-semibold">{'Today Highlights'}</p>
                        </div>
                        <div className="">
                            <Image 
                                src={'https://picsum.photos/250/150'} 
                                alt='Highlights image' 
                                width={250} 
                                height={150} 
                                className='object-center rounded-lg' 
                                priority
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-black text-lg font-semibold">{details?.highlights?.title}</p>
                            <p className="text-sm text-[#c2c2c2] font-medium">{details?.highlights?.description}</p>
                        </div>
                    </div>

                    {/* Interest */}
                    <div className="rounded-lg bg-white rounded-b-lg border-r border-gray-100 shadow-sm p-4 flex flex-col gap-4">
                        <div className="">
                            <p className="text-indigo-700 font-semibold">{'Interest'}</p>
                        </div>
                        <div className="flex flex-wrap gap-x-1 gap-y-2">
                            <Image 
                                src={'https://picsum.photos/100/80?random=1'} 
                                alt='Interest image 1' 
                                width={100} 
                                height={80} 
                                className='w-[calc((100%-10px)/3)] object-cover rounded-lg' 
                            />
                            <Image 
                                src={'https://picsum.photos/100/80?random=2'} 
                                alt='Interest image 2' 
                                width={100} 
                                height={80} 
                                className='w-[calc((100%-10px)/3)] object-cover rounded-lg' 
                            />
                            <Image 
                                src={'https://picsum.photos/100/80?random=3'} 
                                alt='Interest image 3' 
                                width={100} 
                                height={80} 
                                className='w-[calc((100%-10px)/3)] object-cover rounded-lg' 
                            />
                            <Image 
                                src={'https://picsum.photos/100/80?random=4'} 
                                alt='Interest image 4' 
                                width={100} 
                                height={80} 
                                className='w-[calc((100%-10px)/3)] object-cover rounded-lg' 
                            />
                            <Image 
                                src={'https://picsum.photos/100/80?random=5'} 
                                alt='Interest image 5' 
                                width={100} 
                                height={80} 
                                className='w-[calc((100%-10px)/3)] object-cover rounded-lg' 
                            />
                            <Image 
                                src={'https://picsum.photos/100/80?random=6'} 
                                alt='Interest image 6' 
                                width={100} 
                                height={80} 
                                className='w-[calc((100%-10px)/3)] object-cover rounded-lg' 
                            />
                        </div>
                    </div>
                </div>

                <div className="col-span-3">
                    <div className="rounded-lg bg-white rounded-b-lg border-r border-gray-100 shadow-sm p-4 flex flex-col gap-4 divide-y-2">
                        <div className="flex">
                            {tabs?.map((tab, index) => (
                                <div className="flex flex-col gap-1 cursor-pointer" key={index} onClick={() => setSelectedIndex(index)}>
                                    <p className={`${selectedIndex === index ? 'text-indigo-700' : 'text-[#c2c2c2]'} mx-4 font-semibold text-lg`}>{tab.text}</p>
                                    {selectedIndex === index && (
                                        <span className="bg-indigo-700 h-[2px]" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="">
                            {tabs[selectedIndex].component}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile