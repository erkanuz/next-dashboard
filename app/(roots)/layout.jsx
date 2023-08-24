import { TopBar } from '@/components'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
        <main className='ml-20'><TopBar />{children}</main>
    </div>
  )
}

export default layout