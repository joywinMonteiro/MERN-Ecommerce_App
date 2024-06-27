// eslint-disable-next-line no-unused-vars
import React from 'react'
import whatsapp from '../assets/whatsapp_icon.png'
import instagram from '../assets/instagram_icon.png'
import pinInterest from '../assets/pintester_icon.png'

const Footer = () => {
  return (
    <div className='bg-gray-800 flex flex-col items-center static bottom-0 w-full'>
        <ul className='flex gap-8 items-center fixed-bottom-0 p-10'>
            <li className='cursor-pointer hover:bg-green-500 rounded-full border-4 bg-white'><img src={whatsapp} alt="whatsapp" /></li>
            <li className='cursor-pointer hover:bg-pink-500 rounded-full border-4 bg-white'><img src={instagram} alt="instagram" /></li>
            <li className='cursor-pointer hover:bg-red-600 rounded-full border-4 bg-white'><img src={pinInterest} alt="pinterest" /></li>
        </ul>
        <p className='text-3xl text-white font-bold'>&copy;Amazon@2024. all rights reserved</p>
    </div>
  )
}

export default Footer