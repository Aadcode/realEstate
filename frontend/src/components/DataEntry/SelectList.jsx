'use client'
import React, { useState } from 'react';
import MultiSelect from './MultiSelect';

const SelectList = () => {
    const options = ['1', '2', '3', '4', '5'];
    const [single, setSingle] = useState('1');


    return (
        <div className="flex flex-col gap-6 p-6 text-sm text-gray-700 bg-white shadow-md rounded-lg w-full">
            <div>
                <label className="block mb-2 font-semibold text-indigo-900">
                    Select list (select one):
                </label>
                <div className="relative">
                    <select
                        className="w-full appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        value={single}
                        onChange={(e) => setSingle(e.target.value)}
                    >
                        {options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        ▼
                    </div>
                </div>
            </div>

            <MultiSelect />
        </div >
    );
};

export default SelectList;
