import Link from 'next/link'
import React from 'react'

import { BsBag } from 'react-icons/bs'
import { SiNextdotjs } from 'react-icons/si'
import { RxDashboard } from 'react-icons/rx'
import { AiOutlineUser, AiOutlineFileAdd } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { GoChecklist } from 'react-icons/go'
import { CiLogout } from 'react-icons/ci'

const sidebarItems = [
  { id: 1, icon: <RxDashboard size={20} />, link: '/' },
  { id: 2, icon: <AiOutlineUser size={20} />, link: '/users' },
  { id: 3, icon: <BsBag size={20} />, link: '/products' },
  { id: 3, icon: <GoChecklist size={20} />, link: '/orders' },
  { id: 4, icon: <AiOutlineFileAdd size={20} />, link: '/add' },
  { id: 4, icon: <FiSettings size={20} />, link: '/settings' },
]
export const Sidebar = ({children}) => {
  return (
    <div className='flex'>
      <div className='fixed flex flex-col items-center justify-between h-screen w-20 p-4 bg-white border-r-[1px] shadow-lg'>
        <div className='flex flex-col'>
          <Link href='/'>
            <div className='bg-gray-100 p-3 rounded-lg inline-block'>
              <SiNextdotjs size={20} />
            </div>
          </Link>
          <span className='border-b-[1px] border-gray-200 w-full p-2'></span>
          {sidebarItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <li className='bg-gray-100 p-3 my-4 rounded-lg inline-block'>
                <Link href={item.link}>{item.icon}</Link>
              </li>
            </React.Fragment>
          ))}
        </div>
        <div className='bg-gray-100 p-3 my-4 rounded-lg inline-block'>
          <CiLogout size={20} />
        </div>
      </div>
      <main className='ml-20 w-full'>{children}</main>
    </div>
  )
}