import React from 'react'

const TextArea = () => {
    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
            <div className="py-2 border-b">
                <p className="text-black text-lg font-semibold">Checkbox</p>
            </div>
            <div className='w-full'>
                <textarea rows={5} className='border border-gray-300 rounded-md w-full outline-none'/>
            </div>
        </div>
    )
}

export default TextArea