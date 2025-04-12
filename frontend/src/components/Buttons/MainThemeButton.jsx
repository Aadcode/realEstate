import React from 'react'

const MainThemeButton = ({text}) => {
    return (
        <button className="px-4 py-2 text-base font-medium text-center text-white whitespace-nowrap rounded-xl border border-solid bg-indigo-700 bg-opacity-10 border-indigo-700 border-opacity-10">
            {text}
        </button>
    )
}

export default MainThemeButton