// eslint-disable-next-line no-unused-vars
import React from 'react'

const Contact = () => {
  return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
          <div className='w-[800px] border-2 border-black p-16 rounded-xl bg-white shadow-md'>
            <div className='mb-4 flex gap-6'>
              <div className='text-xl font-bold w-20'>Name</div>
              <div className='text-xl font-bold'>:</div>
              <div className='font-semibold text-2xl text-purple-800 ml-2'>Joywin Monteiro</div>
            </div>
            <div className='mb-4 flex gap-6'>
              <div className='text-xl font-bold w-20'>Email</div>
              <div className='text-xl font-bold'>:</div>
              <div className='font-semibold text-2xl text-purple-800 ml-2'>joywinmonteiro10@gmail.com</div>
            </div>
            <div className='mb-4 flex gap-6'>
              <div className='text-xl font-bold w-20'>Contact</div>
              <div className='text-xl font-bold'>:</div>
              <div className='font-semibold text-2xl text-purple-800 ml-2'>8296874288</div>
            </div>
          </div>
        </div>
    
  )
}

export default Contact