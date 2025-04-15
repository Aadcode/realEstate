'use client';
import React, { useState } from 'react';

const CustomSelects = () => {
    const [selected, setSelected] = useState('Option 1');

    const options = ['Option 1', 'Option 2', 'Option 3'];

    return (
        <div className="justify-self-stretch bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
            <div className="py-2 border-b">
                <p className="text-black text-lg font-semibold">Select Size</p>
            </div>
            <div className="flex flex-col gap-4 w-full ">
                <CustomSelect
                    size="lg"
                    options={options}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                />
                <CustomSelect
                    size="md"
                    options={options}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                />
                <CustomSelect
                    size="sm"
                    options={options}
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                />
            </div>
        </div>

    );
};

const CustomSelect = ({ options = [], value, onChange, size = 'md' }) => {
    const sizeClasses = {
        lg: 'py-3 px-4 text-base',
        md: 'py-2.5 px-4 text-sm',
        sm: 'py-1.5 px-3 text-xs',
    };

    return (
        <div className="relative">
            <select
                className={`w-full text-gray-400 rounded-md border border-gray-300 bg-white appearance-none ${sizeClasses[size]} pr-10 outline-none`}
                value={value}
                onChange={onChange}
            >
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            {/* Dropdown icon */}
            <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ▼
            </div>
        </div>
    );
};

export default CustomSelects;
