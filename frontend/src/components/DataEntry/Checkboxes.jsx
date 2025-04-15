'use client';
import React, { useState } from 'react';

const Checkboxes = () => {
    const [checkboxes, setCheckboxes] = useState({
        cb1: false,
        cb2: true,
        cb3: true,
        cb4: true,
        cb5: true,
        cb6: true,
        cb7: true,
        cb8: true,
        cb9: true,
    });

    const toggleCheckbox = (key) => {
        setCheckboxes((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
            <div className="py-2 border-b">
                <p className="text-black text-lg font-semibold">Checkbox</p>
            </div>
            <div className="flex flex-col flex-wrap gap-6 text-gray-500">

                {/* Normal Label Checkboxes */}
                <div className='flex flex-wrap gap-x-10 gap-y-6'>

                    <Checkbox label="Checkbox 1" color="blue" checked={checkboxes.cb1} onChange={() => toggleCheckbox('cb1')} />
                    <Checkbox label="Checkbox 2" color="blue" checked={checkboxes.cb2} onChange={() => toggleCheckbox('cb2')} />
                    <Checkbox label="Checkbox 3" color="green" checked={checkboxes.cb3} onChange={() => toggleCheckbox('cb3')} />
                    <Checkbox label="Checkbox 4" color="orange" checked={checkboxes.cb4} onChange={() => toggleCheckbox('cb4')} />
                    <Checkbox label="Checkbox 5" color="red" checked={checkboxes.cb5} onChange={() => toggleCheckbox('cb5')} />
                </div>

                {/* Interactive Color Checkboxes */}
                <div className='flex flex-wrap gap-10'>
                    <ColorBox size="sm" color="indigo" checked={checkboxes.cb6} onChange={() => toggleCheckbox('cb6')} />
                    <ColorBox size="md" color="blue" checked={checkboxes.cb7} onChange={() => toggleCheckbox('cb7')} />
                    <ColorBox size="lg" color="green" checked={checkboxes.cb8} onChange={() => toggleCheckbox('cb8')} />
                    <ColorBox size="xl" color="orange" checked={checkboxes.cb9} onChange={() => toggleCheckbox('cb9')} />
                </div>
            </div>
        </div>
    );
};

// Label checkbox component
const Checkbox = ({ label, checked, onChange, color = "blue" }) => {
    return (
        <label className="flex items-center space-x-2 cursor-pointer">
            <input
                type="checkbox"
                className="hidden peer"
                checked={checked}
                onChange={onChange}
            />
            <div
                className={`w-5 h-5 ${checked ? `bg-${color}-500` : "border-2 border-gray-300"} rounded-sm flex items-center justify-center`}
            >
                {checked && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </div>
            <span className="text-sm text-gray-700">{label}</span>
        </label>
    );
};

// ColorBox checkbox component
const ColorBox = ({ color = "blue", checked = false, onChange, size = "md" }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
        xl: 'w-8 h-8',
    };

    return (
        <div
            className={`cursor-pointer ${sizeClasses[size]} rounded-sm flex items-center justify-center transition-all duration-200 ${checked ? `bg-${color}-500` : "border-2 border-gray-300"}`}
            onClick={onChange}
        >
            {checked && (
                <svg className={`text-white ${size === 'xl' ? 'w-4 h-4' : 'w-3 h-3'}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            )}
        </div>
    );
};

export default Checkboxes;
