// eslint-disable-next-line no-unused-vars
import React from 'react'

const Contact = () => {
  return (
    <div className='flex flex-col h-96 w-max mx-16 items-center justify-center my-24 border-2 rounded-2xl border-black bg-gray-300'>
        <div className='flex flex-wrap w-1/2 gap-4 p-2'>
        <h1 className='text-xl font-bold basis-20'>Name : </h1><span className='basis-1/2 font-semibold text-2xl text-purple-800'>Joywin Monteiro</span>
        <h1 className='text-xl font-bold basis-20'>Email : </h1><span className='basis-1/2 font-semibold text-2xl text-purple-800'>joywinmonteiro10@gmail.com</span>
        <h1 className='text-xl font-bold basis-20'>Contact : </h1><span className='basis-1/2 font-semibold text-2xl text-purple-800'>8296874288</span>
        </div>
    </div>
  )
}

export default Contact