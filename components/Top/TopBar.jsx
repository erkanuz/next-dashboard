import React from 'react'
import { Dropdown, SearchBar, SelectButton } from '../ui'

export const TopBar = () => {

  return (
    <div className='w-full p-6 bg-white shadow'>
      <div className='flex items-center justify-between'>
        <SelectButton />
        <div></div>
        <div className='flex items-center gap-3'>
          <SearchBar />
          <Dropdown />
        </div>
      </div>
    </div>
  )
}
