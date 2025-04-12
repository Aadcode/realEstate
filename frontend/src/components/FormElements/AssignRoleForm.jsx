'use client'
import React, { useEffect, useRef, useState } from 'react'
import MainThemeButton from '../Buttons/MainThemeButton'
import { toast } from 'react-hot-toast'

const AssignRoleForm = () => {
    const [isRoleOpen, setIsRoleOpen] = useState(false)
    const [isUserOpen, setIsUserOpen] = useState(false)
    const [selectedRole, setSelectedRole] = useState('Choose...')
    const [users, setUsers] = useState([])
    const [activeUser, setActiveUser] = useState(null)
    const [userSearchTerm, setUserSearchTerm] = useState('')
    const [roleSearchTerm, setRoleSearchTerm] = useState('')
    const dropdownRef = useRef(null)
    const userDropdownRef = useRef(null)
    const roleOptions = ['Agent', 'Customer']

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:8000/api/v1/users')
                const json = await res.json()
                const userList = json.data

                setUsers(userList)
                if (userList.length > 0) {
                    setActiveUser(userList[0])
                    setSelectedRole(capitalize(userList[0].role))
                }
            } catch (error) {
                toast.error("Failed to fetch users.")
            }
        }

        fetchUsers()
    }, [])

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsRoleOpen(false)
            }
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()

    const handleRoleSelect = (option) => {
        setSelectedRole(option)
        setIsRoleOpen(false)
    }

    const handleUserSelect = (user) => {
        setActiveUser(user)
        setSelectedRole(capitalize(user.role))
        setIsUserOpen(false)
        setUserSearchTerm('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selectedRole || selectedRole === 'Choose...' || !activeUser) {
            toast.error('Please select a user and role before submitting.')
            return
        }

        try {
            const res = await fetch(`http://localhost:8000/api/v1/users/${activeUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: selectedRole.toUpperCase() }),
            })

            if (!res.ok) {
                throw new Error("API call failed.")
            }

            toast.success('User role updated successfully!')
        } catch (err) {
            toast.error('Failed to update role. Please try again.')
        }
    }

    if (!users.length) return <div className="p-4">Loading user data...</div>
    if (!activeUser && users.length) setActiveUser(users[0])

    return (
        <div>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1 text-gray-700 font-semibold'>
                    <label>Select User</label>
                    <div className="relative w-full" ref={userDropdownRef}>
                        <div
                            onClick={() => setIsUserOpen(!isUserOpen)}
                            className="border border-gray-300 rounded-lg p-2 w-full text-left bg-white cursor-pointer"
                        >
                            {activeUser ? (
                                <span className='text-gray-700'>{activeUser.name} ({activeUser.email})</span>
                            ) : (
                                <span className='text-gray-400'>Select a user...</span>
                            )}
                            <span className="float-right">&#9662;</span>
                        </div>
                        {isUserOpen && (
                            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    className="p-2 border-b w-full text-sm focus:outline-none"
                                    onChange={(e) => setUserSearchTerm(e.target.value)}
                                    value={userSearchTerm}
                                    autoFocus
                                />
                                <ul>
                                    {users
                                        .filter(user =>
                                            user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                                            user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
                                        )
                                        .map((user) => (
                                            <li
                                                key={user.id}
                                                onClick={() => handleUserSelect(user)}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                            >
                                                <div className="font-medium">{user.name}</div>
                                                <div className="text-sm text-gray-600">{user.email}</div>
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label>Name</label>
                        <input type="text" value={activeUser?.name || ''} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label>Password</label>
                        <input type="text" value="********" disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                </div>

                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label>Email</label>
                        <input type="email" value={activeUser?.email || ''} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label>Phone</label>
                        <input type="tel" value={activeUser?.phone || ''} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
                    </div>
                </div>

                <div className='flex gap-4 text-gray-700 font-semibold'>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label>Role</label>
                        <div className="relative w-full" ref={dropdownRef}>
                            <div
                                onClick={() => setIsRoleOpen(!isRoleOpen)}
                                className="border border-gray-300 rounded-lg p-2 w-full text-left bg-white cursor-pointer"
                            >
                                <span className={`${selectedRole === 'Choose...' ? 'text-gray-400' : 'text-gray-700'}`}>{selectedRole}</span>
                                <span className="float-right">&#9662;</span>
                            </div>
                            {isRoleOpen && (
                                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
                                    <input
                                        type="text"
                                        placeholder="Search role..."
                                        className="p-2 border-b w-full text-sm focus:outline-none"
                                        onChange={(e) => setRoleSearchTerm(e.target.value)}
                                        value={roleSearchTerm}
                                        autoFocus
                                    />
                                    <ul>
                                        {roleOptions
                                            .filter((option) =>
                                                option.toLowerCase().includes(roleSearchTerm.toLowerCase())
                                            )
                                            .map((option, index) => (
                                                <li
                                                    key={index}
                                                    onClick={() => {
                                                        handleRoleSelect(option)
                                                        setRoleSearchTerm('')
                                                    }}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                >
                                                    {option}
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col gap-1 flex-1'>
                        <label>Location</label>
                        <input type="text" value={activeUser?.location || ''} disabled className='border border-gray-300 rounded-lg p-2 w-full bg-gray-100' />
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