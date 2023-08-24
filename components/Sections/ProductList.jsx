"use client"
import { useState, useEffect } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import { FaOpencart } from 'react-icons/fa'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { formatDate } from '@/components/Helper/helper';

import { DoughnutChart } from "../Chart/DoughnutChart";
import { Chart as ChartJS, LinearScale, BarElement, Title, Tooltip, Legend, CategoryScale } from 'chart.js';

ChartJS.register(
  CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
);

export const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [sortDirection, setSortDirection] = useState("asc"); // Default sorting direction
    const [sortBy, setSortBy] = useState("default"); // Default sorting state
    const [searchQuery, setSearchQuery] = useState(""); // Search query for product_title

    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("/api/products");
          const data = await response.json();
          setProducts(data.products);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
      // Clone the products array before sorting
      const productsCopy = [...products];

      // Filter the products based on search query
      const filteredProducts = productsCopy.filter((product) =>
      product.product_title.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      // Sort the products based on the selected sorting
      filteredProducts.sort((a, b) => {
        if (sortBy === "price") {
          return sortDirection === "asc" ? a.price - b.price : b.price - a.price;
        } else if (sortBy === "inStock") {
          return sortDirection === "asc" ? a.inStock - b.inStock : b.inStock - a.inStock;
        }
      });
  
      setSortedProducts(filteredProducts);
    }, [sortDirection, sortBy, searchQuery, products]);

  
    const toggleSortDirection = () => {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    };

    const handleSortBy = (value) => {
      if (value === sortBy) {
        setSortBy("default");
      } else {
        setSortBy(value);
      }
    };

  return (
    <div>

      <div className="flex items-center justify-between p-4">
        <input
          type="text"
          placeholder="Search by Product Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='w-1/3 px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300'
        />
        <div className="flex items-center gap-4 border rounded-lg p-2">
        <select value={sortBy} onChange={(e) => handleSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price">by Price</option>
          <option value="inStock">by In Stock</option>
        </select>
        <button onClick={toggleSortDirection}>
          {sortDirection === "asc" ? <AiOutlineArrowDown /> : <AiOutlineArrowUp />}
        </button>
        </div>
      </div>

      <div className='grid-container'>
        <div className='p-4'>
          <div className='p-4 border rounded-lg bg-white overflow-y-scroll lg:h-[80vh] h-[70vh]'>
            <div className='my-3 px-3 py-1 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 items-center justify-between font-medium'>
              <span className='text-left'>Title</span>
              <span className='hidden lg:grid'>Color</span>
              <span className='hidden md:grid'>Producer</span>
              <span className='grid text-right sm:text-left'>Price</span>
              <span className='hidden sm:grid'>Created</span>
              <span className='hidden sm:grid'>In Stock</span>
            </div>
            <ul>
              {sortedProducts.map((product) => (
                <ProductListItem key={product._id} product={product} />
              ))}
            </ul>
          </div>
        </div>

        <div  className='rounded-lg lg:h-[80vh] h-[70vh] m-4 flex flex-col items-center justify-evenly border'>
        <h1 className='text-xl font-medium italic'>Total Products</h1>
        <div className='relative w-full m-auto bg-white rounded-lg md:col-span-2 lg:h-[70vh] h-[50vh] p-4'>
          <DoughnutChart products={products} />
        </div>
        </div>
      </div>

    </div>
  )
}

function ProductListItem({product}) {
  return (
    <li key={product._id} className='bg-gray-50 rounded-lg my-3 p-2 grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 justify-between items-center'>
      
      <div className='flex items-center gap-2'>
        <div className='bg-green-300 p-3 rounded-lg'>
          <FaOpencart color='white' />
        </div>
        <p className='text-gray-400 text-sm sm:text-base font-bold'>{product.product_title}</p>
      </div>

      <p className='lg:flex hidden'>{product.color}</p>
      <p className='sm:flex hidden'>{product.producer}</p>
      <p className='text-right sm:text-left'>${product.price}</p>
      <p className='sm:flex hidden'>{formatDate(product.createdAt)}</p>

      <div className='sm:flex hidden items-center justify-between'>
        <p>{product.inStock ? <AiOutlineCheck color='green' /> : <AiOutlineClose color='red' />}</p>
        <BsThreeDotsVertical />
      </div>

    </li>
  );
}