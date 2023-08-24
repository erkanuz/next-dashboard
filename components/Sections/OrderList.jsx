"use client"
import React, { useState } from 'react';
import { formatDate } from '../Helper/helper';

export const OrderList = ({ topics }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = topics.filter((topic) =>
    topic.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='min-h-screen bg-white p-4'>
      <h1 className='text-4xl font-bold py-4'>Orders</h1>

      <div className='my-4'>
        <input
          type='text'
          placeholder='Search by customer name'
          className='border border-gray-300 p-2 rounded-md'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className='grid xl:grid-cols-4 lg:grid-cols-2 grid-cols-1 gap-5 my-10'>
        {filteredTopics.map((topic) => (
          <li key={topic._id}>
            <HoverCard order={topic} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const HoverCard = ({ order }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className='bg-white p-4 rounded-lg shadow'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className='flex items-center space-x-2 text-sm'>
        <p className='text-blue-400 font-bold hover:underline'>{order.customer_name}</p>
        <p className='text-gray-500'>{formatDate(order.order_date)}</p>
        <p>
          <span
            className={
              order.status_type === 'Processing'
                ? 'bg-green-200 p-1 rounded-lg'
                : order.status_type === 'Completed'
                ? 'bg-blue-200 p-1 rounded-lg'
                : 'bg-yellow-200 p-1 rounded-lg'
            }>
            {order.status_type}
          </span>
        </p>
      </div>
      <div className='text-sm text-gray-700 pt-0.5'>{order.shipping_address}</div>
      <div className='text-sm font-medium text-black'>${order.total_amount}</div>
      <div>
        {isHovered && order.products.length > 0 ? (
          <ul>
            {order.products.map((product) => (
              <li key={product.product_id} className='sm:flex text-xs gap-3'>
                <p>Name: {product.product_name}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: ${product.unit_price}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={`text-xs ${order.products.length > 0 ? 'text-blue-500' : 'text-red-500'}`}>
            {order.products.length > 0 ? 'Hover to see products' : 'No products'}
          </p>
        )}
      </div>
    </div>
  );
};