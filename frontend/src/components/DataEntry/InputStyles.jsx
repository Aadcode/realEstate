import React from 'react'

const InputStyles = () => {
    return (
        <div className="justify-self-stretch bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
            <div className="py-2 border-b">
                <p className="text-black text-lg font-semibold">Input Styles</p>
            </div>
            <div className='flex flex-col gap-4 text-gray-500 '>
                <input type='text' className='rounded-md px-3 py-2 outline-none border border-gray-200' placeholder='input-default' />
                <input type='text' className='rounded-full px-3 py-2 outline-none border border-gray-200' placeholder='input-rounded' />
            </div>
        </div>
    )
}

export default InputStyles