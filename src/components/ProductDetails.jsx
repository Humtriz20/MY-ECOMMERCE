import React from 'react'
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RollingLoader from './RollingLoader';
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebookF, faTwitter } from '@fortawesome/free-solid-svg-icons';


 const ProductDetails = () => {
  const [loading, setLoading] = useState(true);
    //the id to acess our product details for each and every one of them
    const {id} = useParams()
    //the state of the array
    const [product, setProduct] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        const fetchProductDetails = async () => {
          try {
            const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
            setProduct(response.data);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching product data:', error);
            setLoading(false);
          }
        };
    
        fetchProductDetails();
      }, [id]);
      if (loading) {
        return <RollingLoader />;
      }
    
      if (!product) {
        return <div>Error fetching product details.</div>;
      }

      const Goback=()=>{
        setLoading(true);
        setTimeout(() => {
        navigate('/');
        setLoading(false);
      }, 1000);
      }
  return (
    <>
    <div>
      {loading ? (
        <RollingLoader />
      ) : (
        <button onClick={Goback}>Back</button>
      )}
    </div>
    <div className='flex relative md:gap-12 mx-auto mt-10 w-10/12   '>
      <div className='flex gap-16 w-10/12 shadow-2xl py-20 '>
          <div>
            <img className="w-80 h-96 cursor-zoom-in  ml-10" style={{ aspectRatio: '1/1' }} src={product.image} alt={product.title} />
            <p className='ml-16 w-64 font-bold mt-3'>SHARE THIS PRODUCT</p>
            {/* <FontAwesomeIcon icon={faFacebookF} />
            <FontAwesomeIcon icon={faXTwitter} /> */}
          </div>
          <div className='space-y-6 mt-1'>
            <button className='bg-blue-700 text-white p-1 rounded'>Offical store</button>
            <h3 className=' text-xl'>{product.title}</h3>
            <div className='absolute '>
            <h3 className='font-bold text-5xl '>${product.price}</h3>
          </div>
            <div className='absolute bottom-12'>
              <button className='bg-orange-400 text-white px-44 h-14 font-bold text-xl rounded'>Add To Cart</button>
            </div>
          </div>
      </div>
          <div className='shadow-2xl '>
            <div className='ml-6'>
              <h1 className='font-bold'> DELIVERY AND RETURNS</h1>
              <p>Free delivery on thousands of products in Lagos, Ibadan & Abuja Details</p>
              <p className='font-bold'>Choose your location</p>
            </div>
          </div>

      
          
   

    </div>

   <div className='w-10/12 mx-auto mt-10 h-80'>
      <div className='w-8/12 shadow-xl h-64'>
        <div className='ml-4 space-y-4'>
          <h1 className='font-bold text-2xl'>Product Details</h1>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
    </>
  )
}
export default ProductDetails;
