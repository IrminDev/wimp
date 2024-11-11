import React from 'react'
import ButtonLink from './ButtonLink'

const Header = ({children}) => {
    return (
        <div className=' w-full flex flex-row space justify-between'>
            <div className=' flex flex-row w-full'>
                <div className=' rounded-br-3xl flex bg-white font-semibold text-center items-center text-3xl text-slate-900 px-14 py-3 w-min'>
                    W<span className=' text-violet-600'>i</span>MP
                </div>
                <div className=' ml-10 flex flex-row items-center justify-normal w-min'>
                    {children}
                </div>
            </div>
            <div className='px-5 w-full flex justify-end items-end '>
                <ButtonLink url='/login' label='Iniciar sesión' />
            </div>
        </div>
    )
}

export default Header
