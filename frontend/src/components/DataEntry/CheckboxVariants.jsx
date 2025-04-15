import React from 'react'

const CheckboxVariants = () => {

    const checkboxes = [
        { label: "Option 1" , checked: true },
        { label: "Option 2" , checked: false },
        { label: "Disabled", disabled: true },
    ];

    return (
        <div className="justify-self-stretch bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
            <div className="py-2 border-b">
                <p className="text-black text-lg font-semibold">Checkboxes</p>
            </div>
            <div className="">
                {checkboxes.map((checkbox, index) => (
                    <div key={index} className="flex items-center ">
                        <input
                            type="checkbox"
                            disabled={checkbox.disabled}
                            defaultChecked={checkbox?.checked ?? false}
                            className={`mr-2 ${checkbox.disabled ? 'cursor-not-allowed' : ''}`}
                        />
                        <span className={`${checkbox.disabled ? 'text-gray-300': 'text-gray-700'}`}>{checkbox.label}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CheckboxVariants