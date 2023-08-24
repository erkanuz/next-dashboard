"use client"
import React, { useEffect, useState } from 'react'
import { BarChart } from '../Chart';

export const Bar = () => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/topics");
                const data = await response.json();
                setTopics(data.topics);
            } catch (error) {
                console.error("Error fetching topics:", error);
            }
        }
        fetchData();
    }, []);
    
  return (
    <div className='relative w-full m-auto bg-white border rounded-lg md:col-span-2 lg:h-[65vh] h-[50vh]'>
        <BarChart topics={topics} />
    </div>
  )
}