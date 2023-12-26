import React from 'react'
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RollingLoader from './RollingLoader';



 const Cart = ({  incrementQuantity, decrementQuantity,quantityUpdate, existingCartItems }) => {
  const [cartItems, setCartItems] = useState([]);
  const [removedItem, setRemovedItem] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);
 

  useEffect(() => {
    // Retrieve cart items from local storage
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
  }, [existingCartItems]);

  const removeItem = (itemId) => {
    // Remove item logic here
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    // Set removedItem message
    setRemovedItem('Item removed from the cart');

    // Clear the removedItem message after 3 seconds
    setTimeout(() => {
      setRemovedItem('');
    }, 3000);
  };

  // if (loading) {
  //   return <RollingLoader />;
  // }

  
  // const checkout=()=>{
  //   loading(true)
  //  setTimeout(() => {
  //     navigate('/checkout')
  //     loading(false)
  //   }, 2000);
   
  // }
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  return (
    <div className=''>
      {removedItem && (
      <div className='bg-red-700 w-full h-8 text-center align-middle text-xl  text-white '>
        <p className='ml-32'>{removedItem}</p>
      </div>
      )}
      {quantityUpdate && (
        <div className='bg-green-600 text-lg w-full h-10 text-center align-middle text-white'>
          <p className=''>{quantityUpdate}</p>
        </div>
      )}
     <div className='w-96 text-2xl font-bold mt-4 ml-36'>
     <h1>CART{}</h1>
     </div>
    <div className='flex w-10/12 mx-auto gap-6 mt-1'>
    
      <div className='w-9/12'>
        {cartItems.map((item) => (
          <div key={item.id} className='border relative h-64'>
            <img className='w-32 absolute top-8 left-8 ' style={{ aspectRatio: '1/1' }} src={item.image} alt="" />
              <div className='w-full absolute top-8 left-44 font-semibold text-xl'>{item.title}</div>
              <div className='absolute right-10 top-8 text-2xl font-bold'>${item.price}</div> 
              <button className='absolute bottom-6 left-12 text-orange-500 font-bold' onClick={() => removeItem(item.id)}>REMOVE</button>
              <div className='absolute bottom-2 right-6'>
              <div className='flex mx-auto  gap-4 mb-3'>
                    <div className='bg-orange-500  text-white text-center  rounded h-8'>
                    <button  className='text-2xl w-9 font-bold ' onClick={()=>decrementQuantity(item)}>-</button>
                    </div>
                   <p>{item.quantity}</p>
                    <div className='bg-orange-500 rounded  text-white text-center h-8'>
                      <button  className='text-2xl font-bold py-0   w-9' onClick={()=>incrementQuantity(item)}>+</button>
                    </div>
                    
                  </div>
                  </div>
     
          </div>
          
        ))}
      </div>

      <div className='w-3/12 border h-48'>
        <h1 className='ml-2 font-bold mb-2 mt-3'>CART SUMMARY</h1><hr />
        <div className='flex gap-48 mt-4 '>
          <p className='ml-2 font-semibold'>Subtotal</p>
          <h1>${subtotal.toFixed(2)}</h1>
        </div>
        <p className='ml-2 mt-3'>Delivery fees not included yet</p>
          <button className='bg-orange-500 p-2 w-80 text-white rounded ml-3 font-semibold text-xl mt-4'> Checkout(${subtotal.toFixed(2)})</button>
      </div>
      
      {/* Add other cart-related UI and functionality here */}
    </div>
   
    </div>
  )
}
export default Cart;