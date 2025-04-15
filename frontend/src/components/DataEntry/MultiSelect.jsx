'use client'
import React, { useState, useRef, useEffect } from 'react';

const MultiSelect = () => {
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleOption = (option) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((opt) => opt !== option)
                : [...prev, option]
        );
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="text-sm text-gray-700 space-y-4">
            <label className="block font-semibold text-indigo-900 mb-1">
                Multiple select list (click to select more than one):
            </label>

            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full text-left rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                    {selectedOptions.length > 0 ? selectedOptions.join(', ') : 'Nothing selected'}
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">▼</span>
                </button>

                {isOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-md border border-gray-300 bg-white shadow-lg max-h-60 overflow-y-auto">
                        {options.map((option, idx) => (
                            <label
                                key={idx}
                                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                <input
                                    type="checkbox"
                                    className="mr-2"
                                    checked={selectedOptions.includes(option)}
                                    onChange={() => toggleOption(option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MultiSelect;
