"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export const EditTopicForm = ({ id, customer_name, shipping_address }) => {
  const [newName, setNewName] = useState(customer_name);
  const [newAddress, setNewAddress] = useState(shipping_address);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newName, newAddress }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-6 mx-2">
        <h1 className="text-2xl font-semibold mb-4">Update Your Information</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label htmlFor="newName" className="text-sm font-medium">
            New Name
          </label>
          <input
            id="newName"
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
            className="border border-gray-300 px-3 py-2 rounded"
            type="text"
            placeholder="Your new name"
            required
          />

          <label htmlFor="newAddress" className="text-sm font-medium">
            New Shipping Address
          </label>
          <input
            id="newAddress"
            onChange={(e) => setNewAddress(e.target.value)}
            value={newAddress}
            className="border border-gray-300 px-3 py-2 rounded"
            type="text"
            placeholder="Your new shipping address"
            required
          />

          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-max">
            Update Information
          </button>
        </form>
      </div>
    </div>
  );
}