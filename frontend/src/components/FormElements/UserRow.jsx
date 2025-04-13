'use client'
import React, { useState, useRef } from 'react'
import { toast, ToastContainer, Slide } from 'react-toastify'
import { CheckCircle, XCircle } from 'lucide-react'
import 'react-toastify/dist/ReactToastify.css'

const UserRow = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selected, setSelected] = useState(user.role || 'Choose...')
    const [loading, setLoading] = useState(false)
    const dropdownRef = useRef(null)

    const options = ['AGENT', 'CUSTOMER']

    const toastErrorOptions = {
        icon: <XCircle size={20} className="text-red-500" />,
    }

    const toastSuccessOptions = {
        icon: <CheckCircle size={20} className="text-green-500" />,
    }

    const handleSelect = (option) => {
        setSelected(option)
        setIsOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!selected || selected === 'Choose...') {
            toast.error('Please select a role before submitting.', toastErrorOptions)
            return
        }

        try {
            setLoading(true)
            const response = await fetch(`http://localhost:8000/api/v1/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: selected.toUpperCase() }),
            })

            if (!response.ok) throw new Error('Failed to update')

            toast.success(`${user.name}'s role updated to ${selected}`, toastSuccessOptions)
        } catch (err) {
            console.error(err)
            toast.error('Failed to update role.', toastErrorOptions)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
                style={{
                    fontFamily: 'Inter, sans-serif',
                    borderRadius: '10px',
                    padding: '8px',
                }}
                toastStyle={{
                    background: '#333',
                    color: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    padding: '16px 20px',
                    fontSize: '14px',
                }}
            />

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
                        className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-800 transition text-sm disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default UserRow
