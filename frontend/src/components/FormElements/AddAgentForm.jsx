'use client'
import React, { useRef, useState } from 'react'
import MainThemeButton from '../Buttons/MainThemeButton'
import { toast } from 'react-hot-toast'

const AddAgentForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState('Choose...');
    const dropdownRef = useRef(null);
    const options = ['Agent', 'Customer'];

    const handleSelect = (option) => {
        setSelected(option);
        setIsOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData(e.target);
        const name = formData.get('name');
        const email = formData.get('email');
        const password = formData.get('password');
        const phone = formData.get('phone');
        const location = formData.get('location');
    
        if (selected === 'Choose...') {
            toast.error("Please select a role.");
            return;
        }
    
        const role = selected.toUpperCase(); // Convert to CUSTOMER or AGENT
    
        try {
            const response = await fetch("http://localhost:8000/api/v1/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, phone, location, role })
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data?.message || 'Something went wrong');
            }
    
            toast.success(`Successfully added new ${selected}`);
        } catch (error) {
            toast.error(error.message || "Something went wrong.");
        }
    };
    

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Name' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input type="text" name="password" id="password" className='border border-gray-300 outline-none rounded-lg p-2 w-full' placeholder='Password' />
                    </div>
                </div>
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
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
                                    className="border border-gray-300 rounded-lg p-2 w-full text-left bg-white cursor-pointer"
                                >
                                    <span className={selected === 'Choose...' ? "text-gray-400" : "text-gray-700"}>
                                        {selected}
                                    </span>
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
