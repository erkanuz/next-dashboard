import React from 'react'
import { BsBagFill } from 'react-icons/bs';
import { formatDate } from '../Helper/helper';

const getTopics = async () => {
  const apiUrl = process.env.API_URL;
  try {
    const res = await fetch(`${apiUrl}/api/topics`, {
      cache: "no-store",
    });

    if(!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
};

export const RecentOrders = async () => {
  const { topics } = await getTopics();
  return (
    <div className='w-full col-span-1 relative lg:h-[65vh] h-[50vh] m-auto p-4 border rounded-lg bg-white overflow-y-scroll'>
      {
        topics.map((t) => (
          <div className='flex items-center justify-between bg-gray-100 rounded-lg my-3 px-2'>
            <div className='flex items-center'>
              <div className='w-8 h-8 bg-green-300 rounded-lg flex items-center justify-center'>
                <BsBagFill color='white' />
              </div>
              <div className='pl-4'>
                <p className='text-gray-400 text-sm sm:text-base font-bold'>{t.customer_name}</p>
                <p className='font-medium'>${t.total_amount}</p>
              </div>
            </div>
            <p className='lg:flex md:hidden text-sm'>{formatDate(t.order_date)}</p>
          </div>
        ))
      }
    </div>
  )
}