'use client'
import React, { useEffect, useRef, useState } from 'react'
import MainThemeButton from '../Buttons/MainThemeButton'

const AddAgentForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Choose...');
    const dropdownRef = useRef(null);
    const options = ['Agent' ,'Customer'];

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
        <div>
            <form className="flex flex-col gap-4" action="" method="">
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="name" className=''>Name</label>
                        <input type="text" name="name" id="name" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Name' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Password' />
                    </div>
                </div>
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="email" className=''>Email</label>
                        <input type="email" name="email" id="email" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Email' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="phone">Phone</label>
                        <input type='tel' name="phone" id="phone" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Phone' />
                    </div>
                </div>

                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex w-full gap-4 text-gray-700 font-semibold'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label htmlFor="state">Role</label>
                            <div className="relative w-full" ref={dropdownRef}>
                                <div
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="border border-gray-300 rounded-lg p-2 w-full text-left bg-white"
                                >
                                    {dropdownRef === null ? (
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
                            <label htmlFor="location">Location</label>
                            <input type="text" name="location" id="location" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Location' />
                        </div>
                    </div>
                </div>
                <div>
                    <MainThemeButton text={'Submit'} />
                </div>
            </form>
        </div>
    )
}

export default AddAgentForm