import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cart from './Cart'
import { Link } from 'react-router-dom';
import RollingLoader from './RollingLoader';

const ProductList = ({cartItems, incrementQuantity, decrementQuantity, updateCartItems,existingCartItems,productAdded,quantityUpdate,addToCart}) => {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <RollingLoader />;
  }

 
  
  const HandleMouseEnter = (productId) => {
    // Disable hover effect for the product if it's already in the cart
    const isProductInCart = existingCartItems.some((item) => item.id === productId);
    if (!isProductInCart) {
      setHoveredProduct(productId);
    }
  };

    const HandleMouseLeave =()=>{
        setHoveredProduct(null)
    }
   
    

  return (
    <>
     <div>
      {productAdded && (
        <div className='bg-green-600 w-full h-10 text-lg text-center align-middle text-white '>
          <p>{productAdded}</p>
        </div>
      )}
      {quantityUpdate && (
        <div className='bg-green-600 text-lg w-full h-10 text-center align-middle text-white '>
          <p>{quantityUpdate}</p>
        </div>
      )}

      <div className='mx-auto flex flex-row md:flex-row gap-2  md:w-10/12 flex-wrap md:mt-20'>
        {products.map((product) => (
          <div
            key={product.id}
            className='md:w-2/12 w-32 m-3 md:m-4 rounded overflow-hidden shadow-xl md:hover:scale-105 cursor-pointer'
            onMouseEnter={() => HandleMouseEnter(product.id)}
            onMouseLeave={HandleMouseLeave}
          >
            <Link to={`/products/${product.id}`}>
              <img
                className='w-full'
                style={{ aspectRatio: '1/1' }}
                src={product.image}
                alt={product.title}
              />
              <div className='md:px-6 py-4 px-2'>
                <h3 className='text-md font-bold mb-2 truncate'>{product.title}</h3>
                <p className='text-gray-600'>${product.price}</p>
              </div>
            </Link>
            <div className='px-2 py-2 md:hidden'>
              {existingCartItems.some((item) => item.id === product.id) ? (
                <div className='flex mx-auto  gap-4 mb-3'>
                  {existingCartItems.find((item) => item.id === product.id).quantity <= 0 ? (
                    <button
                      className='bg-orange-400 text-white w-28 h-8 rounded '
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </button>
                  ) : (
                    <>
                      <div className='bg-orange-400  text-white text-center  rounded h-8'>
                        <button className='text-2xl w-9 font-bold' onClick={() => decrementQuantity(product)}>
                          -
                        </button>
                      </div>
                      <p>{existingCartItems.find((item) => item.id === product.id).quantity}</p>
                      <div className='bg-orange-400 rounded  text-white text-center h-8'>
                        <button
                          className='text-2xl font-bold py-0   w-9'
                          onClick={() => incrementQuantity(product)}
                        >
                          +
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <button
                  className='bg-orange-400 text-white w-28 h-8 rounded '
                  onClick={() => addToCart(product)}
                >
                  Add To Cart
                </button>
              )}
            </div>
            {existingCartItems.some((item) => item.id === product.id) ? (
              <div className='hidden md:block'>
                <div className='flex mx-auto w-11/12 gap-10 mb-3 h-10   '>
                  <div className='bg-orange-400 w-16 text-white text-center  rounded '>
                    <button className='text-3xl w-14   ' onClick={() => decrementQuantity(product)}>
                      -
                    </button>
                  </div>
                  <p className='text-2xl mt-1 '>{existingCartItems.find((item) => item.id === product.id).quantity}</p>
                  <div className='bg-orange-400 rounded w-16 text-white text-center'>
                    <button
                      className='text-3xl mb-2  w-14'
                      onClick={() => incrementQuantity(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              
              <>
                {hoveredProduct === product.id && (
                  <div className='px-1 py-2 md:block hidden'>
                    <button
                      className='bg-orange-400 text-white w-56 h-12 font-bold text-xl rounded'
                      onClick={() => addToCart(product)}
                    >
                      Add To Cart
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  </>

  );
};

export default ProductList;
