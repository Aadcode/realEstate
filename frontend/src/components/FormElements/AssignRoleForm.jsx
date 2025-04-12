'use client'
import React, { useEffect, useRef, useState } from 'react'
import MainThemeButton from '../Buttons/MainThemeButton'
import { toast } from 'react-hot-toast';

const AssignRoleForm = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState('Choose...')
    const [userData, setUserData] = useState(null)
    const dropdownRef = useRef(null)
    const options = ['Agent', 'Customer']

    // Simulate API call
    useEffect(() => {
        const fetchData = async () => {
            // Simulated fetch delay
            const dummyUser = {
                name: 'John Doe',
                email: 'johndoe@example.com',
                phone: '+91 99999 99999',
                location: 'Ahmedabad',
                role: 'Customer',
                password: '********',
            }

            setUserData(dummyUser)
            setSelected(dummyUser.role)
        }

        fetchData()
    }, [])

    const handleSelect = (option) => {
        setSelected(option)
        setIsOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Simulated API response
        try {
            if (!selected || selected === 'Choose...') {
                toast.error('Please select a role before submitting.')
                return
            }

            // Simulate PUT request
            await new Promise((res) => setTimeout(res, 1000))

            toast.success('User role updated successfully!')
        } catch (err) {
            toast.error('Failed to update role. Please try again.')
        }
    }

    if (!userData) return <div className="p-4">Loading user data...</div>

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" value={userData.name} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" value={userData.password} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                </div>
                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value={userData.email} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="phone">Phone</label>
                        <input type='tel' id="phone" value={userData.phone} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                </div>

                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="role">Role</label>
                        <div className="relative w-full" ref={dropdownRef}>
                            <div
                                onClick={() => setIsOpen(!isOpen)}
                                className="border border-gray-300 rounded-lg p-2 w-full text-left bg-white cursor-pointer"
                            >
                                <span className={`${selected === 'Choose...' ? 'text-gray-400' : 'text-gray-700'}`}>{selected}</span>
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
                        <input type="text" id="location" value={userData.location} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                </div>
                <div>
                    <MainThemeButton text={'Submit'} />
                </div>
            </form>
        </div>
    )
}

export default AssignRoleForm
