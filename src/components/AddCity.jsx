import React from 'react'

function AddCity() {
    return (
        <div className='bg-base-200 rounded-2xl h-80 w-60 ml-2 cursor-pointer hidden md:flex'>
            <span className='flex items-center justify-center h-full w-full'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <h1>Add City</h1>
            </span>
        </div>
    )
}

export default React.memo(AddCity)
