import React from "react";

const DeleteConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-opacity-70 bg-gray-500 flex items-center justify-center'>
    <div className='bg-white p-4 rounded-md'>
      <p className='text-lg font-semibold mb-4'>Confirm Deletion</p>
      <p className='mb-4'>Are you sure you want to delete this user?</p>
      <div className='flex justify-end'>
        <button className='mr-2 px-4 py-2 text-sm rounded-md border' onClick={onCancel}>
          Cancel
        </button>
        <button className='px-4 py-2 text-sm rounded-md bg-red-600 text-white' onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  </div>
  );
};

export default DeleteConfirmationModal;