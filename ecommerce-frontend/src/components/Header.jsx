// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import logo from "../assets/logo.png"
import cartIcon from '../assets/cart_icon.png'
import profileIcon from '../assets/profile_icon.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

const Header = () => {

    const [cartCount, setCartCount] = useState(0)
    const {user} = useContext(UserContext)

    useEffect(() => {
      if(user)
        fetchCartCount();
    }, [user]);
  
    const fetchCartCount = async () => {
      try {
        const res = await axios.get("/cart/count");
          setCartCount(res.data.count);
      } catch (error) {
        console.log("Error fetching cart count:", error);
      }
    };
  
      
  return (
      <header className='flex items-start h-[60px] mx-auto  bg-gray '>
        <div className='flex items-center p-4 gap-2 '>
          <img src={logo} alt="logo" className='h-6 w-6 md:h-12 md:w-12' />
          <Link to="/"><p className='hidden lg:block lg:text-orange-800 lg:text-2xl lg:font-bold lg:cursor-pointer'>Amazon</p></Link>
        </div>
        
        <div className=''>
          <ul className='flex flex-row gap-2  p-6 md:flex-row md:gap-4 md:mx-auto lg:flex-row lg:gap-6  lg:ml-[0px] xl:flex-row xl:gap-8 xl:ml-[150px] '>
              <Link to="/">
              <li className='w-30 h-10 text-rose-700 text-sm font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500  md:text-lg lg:text-2xl'>
                  Home
              </li>
              </Link>

                <Link to="/category/men">
                <li className='w-30 h-10 text-rose-700 text-sm font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 md:text-lg lg:text-2xl'>
                  Men
                </li>
                </Link>

                <Link to="/category/women">
                <li className='w-30 h-10 text-rose-700 text-sm font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 md:text-lg lg:text-2xl'>
                  Women
                </li>
                </Link>

                <Link to="/category/kid">
              <li className='w-30 h-10 text-rose-700 text-sm font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 md:text-lg lg:text-2xl'>
                  Kids
                </li>
                </Link>  

              <Link to="/contact">
              <li className='w-30 h-10 text-rose-700 text-sm font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 md:text-lg lg:text-2xl'>
                  Contact
              </li>
              </Link>

              <Link to="/about">
              <li className='w-30 h-10 text-rose-700 text-sm font-medium px-2 rounded-2xl 
                  hover:cursor-pointer hover:text-gray-500 md:text-lg lg:text-2xl'>
                  About Us
              </li>
              </Link>
          </ul>
        </div>


        <div className='relative w-[80px] h-[80px] ml-auto p-6 md:ml-auto xl:ml-[250px] lg:ml-auto xl:ml-auto'>
          <Link to={user ? "/myCart" : "/login"}>
            <img src={cartIcon} alt="" className='w-[20px] h-[20px] md:w-[30px] md:h-[30px]' />
          </Link>
          <div className='border-2 rounded-full w-[16px] h-[16px] bg-black absolute top-[20px] right-[30px] md:top-[20px] md:right-[20px] md:w-[20px] md:h-[20px]' >
            <span className='text-xs text-red-900 font-bold absolute text-white top-[-2px] right-[3px] md:top-[0px] md:right-[5px]'>{cartCount}</span>
          </div>
        </div>
        
          <div className='flex items-center mt-[25px] gap-3 mx-auto  border-[1px] border-gray-500 p-1 rounded-full cursor-pointer bg-gray-200 md:mt-[25px] md:mx-auto lg:mx-auto xl:mx-auto  lg:h-[30px] lg:rounded-full'>
          <Link to="/login"><img src={profileIcon} alt="" className='rounded-full w-[10px] h-[10px] md:w-[20px] md:h-[20px] lg:w-[20px] lg:h-[20px] lg:p-[1px]'/>
          </Link>
          {!!user && (
            <span className='text-xs text-gray-600 font-bold'>{user.username[0].toUpperCase() + user.username.slice(1)}</span>
          )}
          </div>
      </header>
  )
}

export default Header