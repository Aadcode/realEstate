'use client'
import React, { useState, useEffect } from 'react'
import UserRow from './UserRow'

const UserTable = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/v1/users')
            const data = await response.json()
            if (data.success) {
                setUsers(data.data)
            }
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setLoading(false)
        }
    }

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="p-4 text-black">
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full p-2 border border-gray-300 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <>
                    <div className="grid grid-cols-6 gap-4 font-semibold border-b border-gray-300 pb-2 px-2 text-gray-700">
                        <div className='text-lg font-semibold'>Name</div>
                        <div className='text-lg font-semibold'>Email</div>
                        <div className='text-lg font-semibold'>Phone</div>
                        <div className='text-lg font-semibold'>Location</div>
                        <div className='text-lg font-semibold'>Role</div>
                        <div className='text-lg font-semibold'>Action</div>
                    </div>
                    {filteredUsers.map((user) => (
                        <UserRow key={user.id} user={user} />
                    ))}
                </>
            )}
        </div>
    )
}

export default UserTable