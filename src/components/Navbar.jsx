import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from './Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faXmark, faBars, faCircle, faCircleInfo,faUser,faShoppingCart
   }
from '@fortawesome/free-solid-svg-icons';

 const Navbar = ({ existingCartItems }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Additional logic if needed
  };

  const handleCancelSearch = () => {
    setSearchTerm('');
    // Additional logic if needed
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // Additional logic if needed
  };
  
  const totalQuantity = existingCartItems.reduce((total, item) => total + item.quantity, 0);
  return (
   
      <div>
        <div className='py-3 md:py-3 border bottom-10 md:bg-white bg-black'>
          <div className='md:w-11/12  md:mx-auto flex items-center justify-normal '>
            <div className=''>
    
              <div className='relative md:hidden'>
            <FontAwesomeIcon
                  icon={faBars}
                  className='absolute top-0 left-0  bottom-2 text-theme-100 text-xl cursor-pointer'
                  onClick={() => setSidebarVisible(true)}
                />
                
                </div>
               
             <Link to='/'><h1 className=' font-bold text-theme-100 ml-28 sm:ml-56 md:ml-16 md:mb-0 mt-0'>
                My<span className='text-orange-600 cursor-pointer'>MARKET</span>
              </h1>
              </Link>
            </div>
            <div className='flex gap-32  '>
              <div className='relative md:ml-72 sm:ml-52 ml-20'>
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className='absolute md:left-3 top-1/2 transform -translate-y-1/2 block md:block md:text-theme-700 text-xl text-theme-100'
                  onClick={() => navigate('/searchPage')}
                />
                <input
                  type='text'
                  id='search'
                  placeholder='Search movies...'
                  className='pl-10 pr-10 py-2  hidden md:block w-52  md:w-96 rounded-full  border border-gray-300 focus:outline-none focus:border-blue-500'
                  value={searchTerm}
                  onChange={handleSearchChange}
                />

                {error && <p className='text-red-500 mt-2'>{error}</p>}
                {searchTerm && (
                  <button
                    type='button'
                    className='md:absolute text-theme-500 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500'
                    onClick={handleCancelSearch}
                  >
                    <FontAwesomeIcon icon={faXmark} className='text-xl' />
                  </button>
                )}
                
              </div>
              <ul className='flex gap-20 text-lg '>
        <li onClick={toggleModal} className='  text-theme-100  mt-2 hidden md:block cursor-pointer hover:text-orange-500'>
          <FontAwesomeIcon icon={faUser} className='mr-3 text-xl' />
          Account
          </li>
        
         
        <li className='cursor-pointer hover:text-orange-500 text-theme-100 mt-2 hidden md:block'>
          <FontAwesomeIcon icon={faCircleInfo} className='mr-3 text-2xl' />
          <Link to='/favorite'>Help</Link>
        </li>

        <li className='cursor-pointer hover:text-orange-500 text-theme-100  mt-2 hidden md:block relative'>
        <button className="icon-container relative">
          <Link to='/cart'><FontAwesomeIcon icon={faShoppingCart} className='mr-3 text-xl' /></Link>  
            {totalQuantity > 0 && (
              <span className="notification-badge absolute top-1 right-1 -mt-2  bg-orange-500 text-white px-1  rounded-full text-xs">
                {totalQuantity}
              </span>
            )}
          </button>
          <Link to='/cart'>Cart</Link>
        </li>
      </ul>
            </div>
          </div>
        </div>  
        
  </div>
    

  )
}
export default Navbar;