"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

export const Remove = ({ id }) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const removeTopic = async () => {
    const res = await fetch(`/api/topics?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.refresh();
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    setIsModalOpen(false);
    removeTopic();
  };

  return (
    <div>
      <button onClick={handleDeleteClick} className="text-red-400">
        <HiOutlineTrash size={24} />
      </button>
      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </div>
  );
}