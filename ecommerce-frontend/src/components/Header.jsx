// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import cartIcon from '../assets/cart_icon.png'
import profileIcon from '../assets/profile_icon.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Header = () => {

    const [cartCount] = useState(0)
    const {user} = useContext(UserContext)
    
  return (
    <div>
      <header className='flex border-b-2 items-center mx-2 justify-between bg-gray'>
        <div className='flex items-center p-4 gap-2'>
          <img src={logo} alt="logo" className='h-12 w-12' />
          <Link to="/home"><p className='text-orange-800 text-2xl font-bold cursor-pointer'>Amazon</p></Link>
        </div>
        
        <div>
          <ul className='flex gap-6 p-2'>
              <Link to="/home">
              <li className='w-30 h-10 text-rose-700 text-xl font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 hover:underline'>
                  Home
              </li>
              </Link>

              <Link to="/product">
              <li className='w-30 h-10 text-rose-700 text-xl font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 hover:underline'>
                  Product
                </li>
                </Link>

              <Link to="/contact">
              <li className='w-30 h-10 text-rose-700 text-xl font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 hover:underline'>
                  Contact
              </li>
              </Link>

              <Link to="/about">
              <li className='w-30 h-10 text-rose-700 text-xl font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 hover:underline'>
                  About Us
              </li>
              </Link>
          </ul>
        </div>
        
        <div className='flex gap-6 items-center relative p-3'>
          <img src={cartIcon} alt="" className='w-7 h-7 '/>
          <div className='border-2 rounded-full w-5 h-5 bg-black absolute' style={{top:'4.5px', right:'5px'}}>
            <span className='text-s text-red-900 font-bold absolute text-white' style={{top:'-4px', right:'4px'}}>{cartCount}</span>
          </div>
        </div>
          <div className='flex gap-3 border-[1px] border-gray-500 p-1 rounded-full cursor-pointer bg-gray-200'>
          <Link to="/login"><img src={profileIcon} alt="" className='rounded-full w-7 h-7'/>
          </Link>
          {!!user && (
            <span className='text-xl text-gray-600 font-bold'>{user.username[0].toUpperCase() + user.username.slice(1)}</span>
          )}
          </div>
        

      </header>
    </div>
  )
}

export default Header