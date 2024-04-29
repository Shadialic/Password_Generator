import React from 'react'
import './Header.css'
import logo from '../../assets/logo.svg'
function Header() {
  return (
    <div className='flex flex-row w-full gap-3 border-b-2 shadow-md p-4'>
        <img src={logo} alt="" className='logp w-10 ' />
        <h1 className='font-prompt font-prompt-semibold mt-2'>SecureGen</h1>
    </div>
  )
}

export default Header