"use client";
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { MdArrowDropDown } from 'react-icons/md'

export const Dropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('click', closeDropdown);
  
      return () => {
        window.removeEventListener('click', closeDropdown);
      };
    }, []);
  
    return (
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <div>
          <button
            onClick={toggleDropdown}
            type="button"
            className="flex items-center focus:outline-none"
          >
            <img
              className="w-8 h-8 rounded-full object-cover border-2 border-black"
              src="https://images.pexels.com/photos/1084425/pexels-photo-1084425.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Avatar"
            />
          </button>
        </div>
  
        {isOpen && (
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className="block px-6 py-2 text-sm">
                <p className='font-semibold'>Kitty</p>
                <p className='text-gray-400'>k@example.com</p>
              </div>
              <div className='p-2'>
                <a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Profile</a>
                <a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Billing</a>
                <a href="" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">Settings</a>
              </div>
              <a href="#" className="block px-6 py-2 text-sm text-red-600 hover:bg-red-100" role="menuitem">Sign out</a>
            </div>
          </div>
        )}
      </div>
    );
  };

  export const SelectButton = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    const closeDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      window.addEventListener('click', closeDropdown);
  
      return () => {
        window.removeEventListener('click', closeDropdown);
      };
    }, []);
  
    return (
      <div className="relative md:inline-block hidden text-left border rounded-lg py-1 px-2" ref={dropdownRef}>
        <div>
          <button
            onClick={toggleDropdown}
            type="button"
            className="flex items-center gap-3 focus:outline-none"
          >
            <div className='flex items-center gap-2'>
              <span className='w-7 h-7 rounded-full bg-black'></span>
              <p>{selectedOption ? selectedOption.label : 'Monsters Inc.'}</p>
            </div>
            <MdArrowDropDown />
          </button>
        </div>
  
        {isOpen && (
          <div className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1 divide-y divide-gray-100" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <div className='p-2'>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-1 text-sm border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
                <p className='text-gray-400 px-4 text-sm mt-2'>Personal Account</p>
                {options.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer mb-1.5 ${selectedOption?.value === option.value ? 'bg-gray-100' : ''}`}
                  >
                    <span className='w-5 h-5 rounded-full bg-black'></span>
                    <p className="text-sm text-gray-700">{option.label}</p>
                  </div>
                ))}
                <p className='text-gray-400 px-4 text-sm'>Teams</p>
                {teamOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => handleOptionClick(option)}
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer ${selectedOption?.value === option.value ? 'bg-gray-100' : ''}`}
                  >
                    <span className='w-5 h-5 rounded-full bg-black'></span>
                    <p className="text-sm text-gray-700">{option.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md">
                <AiOutlinePlusCircle />
                <p role="menuitem">Create team</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  const options = [
    { label: 'Kitty Puffy', value: 'kitty_puffy' },
  ];
  
  const teamOptions = [
    { label: 'Alf Inc.', value: 'alf_inc' },
    { label: 'Dern Inc.', value: 'dern_inc' },
  ];