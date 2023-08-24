import React from 'react'
import { ProductList } from '@/components/Sections'

const page = () => {
  return (
    <div className='min-h-screen bg-white py-4'>
      <h1 className='p-4 text-4xl font-bold'>Product List</h1>
      <ProductList />
    </div>
  )
}

export default page