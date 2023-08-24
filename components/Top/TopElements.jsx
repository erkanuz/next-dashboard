"use client"
import React, { useState, useEffect } from 'react';
import { GiReceiveMoney } from 'react-icons/gi';
import { RiAccountPinCircleFill, RiPulseFill, RiShoppingCartFill } from 'react-icons/ri';

const getTotalCount = (items) => items.length;

const calculateRevenue = (topics, multiplier) => {
  const totalAmount = topics.reduce((acc, topic) => acc + topic.total_amount, 0) * multiplier;
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(totalAmount);
};

const revenueElements = [
  { label: 'Daily Revenue', multiplier: 1, icon: <GiReceiveMoney size={24} /> },
  { label: 'Monthly Revenue', multiplier: 30, icon: <GiReceiveMoney size={24} /> },
  { label: 'Annual Revenue', multiplier: 365, icon: <GiReceiveMoney size={24} /> },
];

const ElementCard = ({ label, count, icon }) => (
  <div className='flex justify-between w-full bg-white border rounded-lg p-3 shadow-lg'>
    <div className='flex flex-col w-full pb-4 gap-2'>
      <h2 className='text-gray-600'>{label}</h2>
      <p className='text-2xl lg:text-sm 2xl:text-2xl font-bold'>+{count}</p>
    </div>
    <p className='flex items-center justify-center bg-green-200 rounded-lg p-4'>{icon}</p>
  </div>
);

export const TopElements = () => {
  const [products, setProducts] = useState([]);
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productResponse = await fetch("/api/products");
        const productData = await productResponse.json();
        setProducts(productData.products);

        const topicResponse = await fetch("/api/topics");
        const topicData = await topicResponse.json();
        setTopics(topicData.topics);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const totalProductCount = getTotalCount(products);
  const totalTopicCount = getTotalCount(topics);
  const activeTopicCount = Math.round(topics.length * 0.65);

  return (
    <div className='grid lg:grid-cols-6 grid-cols-1 gap-5 p-4'>
      {revenueElements.map((revenueElement, index) => (
        <ElementCard
          key={index}
          label={revenueElement.label}
          count={calculateRevenue(topics, revenueElement.multiplier)}
          icon={revenueElement.icon}
        />
      ))}
      <ElementCard label='Subscription' count={totalTopicCount} icon={<RiAccountPinCircleFill size={24} />} />
      <ElementCard label='Total Products' count={totalProductCount} icon={<RiShoppingCartFill size={24} />} />
      <ElementCard label='Active now' count={activeTopicCount} icon={<RiPulseFill size={24} />} />
    </div>
  );
};