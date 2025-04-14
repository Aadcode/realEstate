import React from 'react'

const InputSizes = () => {
    return (
        <div className="justify-self-stretch bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
            <div className="py-2 border-b">
                <p className="text-black text-lg font-semibold">Input Styles</p>
            </div>
            <div className='flex flex-col gap-4 text-gray-500 '>
                <input type='text' className='rounded-md px-4 py-3 outline-none border border-gray-200' placeholder='form-control-lg' />
                <input type='text' className='rounded-md px-3 py-2 outline-none border border-gray-200' placeholder='default-input' />
                <input type='text' className='rounded-md px-2 py-1 outline-none border border-gray-200' placeholder='form-control-sm' />
            </div>
        </div>
    )
}

export default InputSizes