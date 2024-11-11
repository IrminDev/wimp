import React from 'react'
import { Link } from 'react-router-dom'

const HeaderLink = ({url, label, children}) => {
    return (
        <div className=' mx-10 bg-slate-700 bg-opacity-20 rounded-md px-7 py-3'>
            <Link to={url} className=' text-white font-semibold w-full flex flex-row items-center justify-between'>
                <div className=' w-[20%] mr-4'>
                    {children}
                </div>
                {label}
            </Link>
        </div>
    )
}

export default HeaderLink
