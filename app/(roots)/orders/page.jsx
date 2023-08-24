"use client";
import React, { useState, useEffect } from "react";
import { OrderList } from "@/components/Sections";

const page = () => {
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
    <div>
      <OrderList topics={topics} />
    </div>
  )
}

export default page