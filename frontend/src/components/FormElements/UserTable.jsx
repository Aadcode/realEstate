'use client'
import React from 'react'
import UserRow from './UserRow'

const dummyUsers = [
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '+91 99999 99999',
        location: 'Ahmedabad',
        role: 'Customer',
        password: '********',
    },
    {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '+91 88888 88888',
        location: 'Mumbai',
        role: 'Agent',
        password: '********',
    },
]

const UserTable = () => {
    return (
        <div className="p-4 text-black">
            <div className="grid grid-cols-6 gap-4 font-semibold border-b border-gray-300 pb-2 px-2 text-gray-700">
                <div className='text-lg font-semibold '>Name</div>
                <div className='text-lg font-semibold '>Email</div>
                <div className='text-lg font-semibold '>Phone</div>
                <div className='text-lg font-semibold '>Location</div>
                <div className='text-lg font-semibold '>Role</div>
                <div className='text-lg font-semibold '>Action</div>
            </div>
            {dummyUsers.map((user, index) => (
                <UserRow key={index} user={user} />
            ))}
        </div>
    )
}

export default UserTable