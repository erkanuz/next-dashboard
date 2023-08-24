"use client";

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';

import { AiFillDelete } from 'react-icons/ai'

const page = () => {

 const [customerName, setCustomerName] = useState("");
 const [orderDate, setOrderDate] = useState("");
 const [products, setProducts] = useState([]);
 const [totalAmount, setTotalAmount] = useState("");
 const [shippingAddress, setShippingAddress] = useState("");
 const [paymentMethod, setPaymentMethod] = useState("Visa");
 const [statusType, setStatus] = useState("On hold");

 const [productID, setProductID] = useState("");
 const [productName, setProductName] = useState("");
 const [productQuantity, setProductQuantity] = useState("");
 const [productUnitPrice, setProductUnitPrice] = useState("");

 const router = useRouter();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if(!customerName || !orderDate || !totalAmount || !shippingAddress || !paymentMethod || !statusType) {
    //If you want you can add an alert or popup modal
    return;
  }

  try {
    const res = await fetch("/api/topics", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ 
          customer_name: customerName,
          order_date: orderDate,
          products,
          total_amount: totalAmount,
          shipping_address: shippingAddress,
          payment_method: paymentMethod,
          status_type: statusType,
       }),
    });

    if(res.ok) {
      router.refresh();
      router.push("/");
    } else {
      throw new Error("Failed to create a topic");
    }
  } catch (error) {
    console.log(error);
  }
 };

 // Function to handle adding a new product to the products array
 const addProduct = () => {
  const newProduct = {
    product_id: productID,
    product_name: productName,
    quantity: productQuantity,
    unit_price: productUnitPrice,
  };
  setProducts([...products, newProduct]);
  };

  const deleteProduct = (index) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  return (
    <div className='min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8'>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto space-y-6'>

        <div>
          <input
            onChange={(e) => setCustomerName(e.target.value)}
            value={customerName}
            type="text"
            placeholder='Customer Name'
            className='block w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300' />
        </div>

        <div>
          <input
            onChange={(e) => setOrderDate(e.target.value)}
            value={orderDate}
            type="date"
            placeholder='Customer Order Date'
            className='block w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300' />
        </div>

        <div>
          <input
            onChange={(e) => setTotalAmount(e.target.value)}
            value={totalAmount}
            type="number"
            placeholder='Total Amount'
            className='block w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300' />
        </div>

        <div>
          <input
            onChange={(e) => setShippingAddress(e.target.value)}
            value={shippingAddress}
            type="text"
            placeholder='Shipping Address'
            className='block w-full mt-1 p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300' />
        </div>

        <div className='mt-1'>
          <label htmlFor="method" className='block text-sm font-medium text-gray-700 mx-1'>Method:</label>
          <select
            id="method"
            type="text"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300'
            required
          >
            <option value="Visa">Visa</option>
            <option value="Paypal">Paypal</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>

        <div className='mt-1'>
          <label htmlFor="method" className='block text-sm font-medium text-gray-700 mx-1'>Status:</label>
          <select
            id="status"
            type="text"
            value={statusType}
            onChange={(e) => setStatus(e.target.value)}
            className='mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-opacity-50 focus:border-blue-300'
            required
          >
            <option value="On hold">On hold</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div
          className='border rounded-lg'>

          <div className='flex gap-5'>
            <div className='relative w-full'>
              <div className='relative justify-start'>
                <input
                  onChange={(e) => setProductID(e.target.value)}
                  value={productID}
                  type="text"
                  placeholder='Product ID'
                  className='inputs' />
                <span className='anim_underline'></span>
              </div>

              <div className='relative justify-start'>
                <input
                  onChange={(e) => setProductName(e.target.value)}
                  value={productName}
                  type="text"
                  placeholder='Product Name'
                  className='inputs' />
                <span className='anim_underline'></span>
              </div>

              <div className='relative justify-start'>
                <input
                  onChange={(e) => setProductQuantity(e.target.value)}
                  value={productQuantity}
                  type="number"
                  placeholder='Product Quantity'
                  className='inputs' />
                <span className='anim_underline'></span>
              </div>

              <div className='relative justify-start'>
                <input
                  onChange={(e) => setProductUnitPrice(e.target.value)}
                  value={productUnitPrice}
                  type="number"
                  placeholder='Product Price'
                  className='inputs' />
                <span className='anim_underline'></span>
              </div>

              {/* Button to add a new product */}
              <button
                type="button"
                onClick={addProduct}
                className='mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
                Add Product
              </button>
            </div>
          </div>

          {/* Display added products */}
          <div className='grid gap-2 mx-4'>
            {products.map((product, index) => (
              <div key={index} className='flex justify-between col-span-6 sm:col-span-4 bg-black border border-gray-300 p-3 mt-2 shadow-md rounded-xl'>
                <div>
                  <p className='text-white text-sm'>Product Name: {product.product_name}</p>
                  <p className='text-white text-sm'>Quantity: {product.quantity}</p>
                  <p className='text-white text-sm'>Unit Price: {product.unit_price}</p>
                </div>
                <button
                  onClick={() => deleteProduct(index)}
                  className='text-red-500 hover:text-red-700'
                >
                  <AiFillDelete size={24} />
                </button>
              </div>
            ))}
          </div>

        </div>

        <button type="submit"
          className='w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600'>Add Topic
        </button>

      </form>
    </div>
  )
}

export default page