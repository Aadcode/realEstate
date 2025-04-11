'use client'
import React, { useEffect, useRef, useState } from 'react'
import MainThemeButton from '../Buttons/MainThemeButton';

const ProfileSettingForm = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Choose...');
    const dropdownRef = useRef(null);
    const options = ['State-1', 'State-2', 'State-3', 'State-4', 'State-5'];

    // useEffect(() => {
    //     const handleClickOutside = () => {
    //         if (dropdownRef.current) {
    //             setIsOpen(false);
    //         }
    //     };

    //     handleClickOutside()
    // }, [selected]);

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    return (
        <div className="px-4 flex flex-col gap-4">
            <div className="">
                <p className="text-indigo-700 text-base font-semibold">{'Account Setting'}</p>
            </div>

            <form className="flex flex-col gap-4" action="" method="">
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="email" className=''>Email</label>
                        <input type="email" name="email" id="email" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Email' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Password' />
                    </div>
                </div>
                <div className='flex flex-col gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='123 Main st' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="address_two">Address 2</label>
                        <input type="text" name="address_two" id="address_two" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Apartment, studio or floor' />
                    </div>
                </div>
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex w-full gap-4 text-gray-700 font-semibold'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" id="city" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='City' />
                        </div>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label htmlFor="state">State</label>
                            <div className="relative w-full" ref={dropdownRef}>
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="border border-gray-300 rounded-lg p-2 w-full text-left bg-white"
                                >
                                    {dropdownRef===null ? (
                                        <span className="text-gray-400">{selected}</span>
                                    ) : <span className="text-gray-700">{selected}</span>
                                    }
                                    <span className="float-right">&#9662;</span>
                                </div>
                                {isOpen && (
                                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                        {options.map((option, index) => (
                                            <li
                                                key={index}
                                                onClick={() => handleSelect(option)}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                {option}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col gap-1 flex-1'>
                            <label htmlFor="zip">Zip</label>
                            <input type="text" name="zip" id="zip" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Zip' />
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-3 text-gray-700 font-semibold'>
                    <input type="checkbox" name="terms" id="terms" className='border border-gray-300 outline-none rounded-lg p-2 w-4 h-4' placeholder='Zip' />
                    <label htmlFor="terms">Check me out</label>
                </div>
                <div>
                    <MainThemeButton text={'Sign In'} />
                </div>
            </form>
        </div>
    )
}

export default ProfileSettingForm