import React from 'react'

export const Header = () => {
  return (
    <div className='flex justify-between px-4 mt-6 mb-4'>
      <h2 className='text-4xl font-bold'>Dashboard</h2>

      <button className='bg-black text-white rounded-md p-2 font-medium md:flex hidden'>Download</button>
    </div>
  )
}