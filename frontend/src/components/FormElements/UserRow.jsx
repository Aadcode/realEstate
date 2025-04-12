'use client'
import React, { useState, useRef } from 'react'
import { toast } from 'react-hot-toast'

const UserRow = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(user.role || 'Choose...')
    const dropdownRef = useRef(null)
    const options = ['Agent', 'Customer']

    const handleSelect = (option) => {
        setSelected(option)
        setIsOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selected || selected === 'Choose...') {
            toast.error('Please select a role before submitting.')
            return
        }

        try {
            await new Promise((res) => setTimeout(res, 1000)) // simulate API call
            toast.success(`${user.name}'s role updated to ${selected}`)
        } catch (err) {
            toast.error('Failed to update role.')
        }
    }

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-4 items-center border-b border-gray-300 py-2 px-2">
            <div>{user.name}</div>
            <div>{user.email}</div>
            <div>{user.phone}</div>
            <div>{user.location}</div>
            <div className="relative" ref={dropdownRef}>
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-sm cursor-pointer flex gap-4 justify-between w-fit min-w-[130px]"
                >
                    <span className={`${selected === 'Choose...' ? 'text-gray-400' : 'text-gray-700'}`}>
                        {selected}
                    </span>
                    <span className="float-right">&#9662;</span>
                </div>
                {isOpen && (
                    <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow max-h-40 overflow-auto text-sm">
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div>
                <button
                    type="submit"
                    className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition text-sm"
                >
                    Save
                </button>
            </div>
        </form>
    )
}

export default UserRow
