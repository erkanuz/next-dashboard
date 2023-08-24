import React from 'react';

export const SearchBar = () => {
  return (
    <div className="md:flex hidden justify-end px-2">
      <input
        type="text"
        placeholder="Search..."
        className="border p-1 rounded-lg"
      />
    </div>
  );
}