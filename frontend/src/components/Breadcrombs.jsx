import Link from 'next/link'
import React from 'react'

const Breadcrombs = ({ props }) => {
    return (
        <div className='flex items-center space-x-2 text-sm text-gray-500'>
            {
                props?.pathArray.map((item,index)=>(
                    <div key={index} className='flex items-center gap-2 font-medium text-base'>
                        <Link href={item?.href ?? '#'} target={item?.target || '_self'} className={`${index===props.pathArray.length-1 ? 'text-gray-700':'text-indigo-700'}`}>{item?.text}</Link>
                        {index !== props?.pathArray?.length - 1 && <span> / </span>}
                    </div>
                ))
            }
        </div>
    )
}

export default Breadcrombs