import React from 'react'

const LineProgress = ({props}) => {

    const { percentage, title, value } = props

    return (
        <div className='flex flex-col gap-2 text-black'>
            <div className='flex justify-between items-center'>
                <p className='font-semibold text-lg'>{title}</p>
                <p className='font-medium text-sm text-gray-500'>{value}</p>
            </div>
            <div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-200">
                    <div className="bg-indigo-700 h-2.5 rounded-full" style={{ width: `${percentage}%` }}></div>
                </div>
            </div>
        </div>
    )
}

export default LineProgress