// import './App.css'
import ProductList from './components/ProductList';
import { Routes, Route } from 'react-router-dom';
  import ProductDetails from './components/ProductDetails';
import Navbar from './components/Navbar'
import  Cart  from './components/Cart'
import { useState } from 'react';
import Checkout from './components/Checkout'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [productAdded, setProductAdded] = useState(''); 
  const [quantityUpdate, setQuantityUpdate] = useState('');
  

  const [cartTotal, setCartTotal] = useState(0);
  const [existingCartItems, setExistingCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );
  const updateCartItems = (updatedItems) => {
    setExistingCartItems(updatedItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedItems));
  };

  const addToCart = (product) => {
    const existingCartItem = existingCartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      // Product is already in the cart, update the quantity
      existingCartItem.quantity += 1;
      setProductAdded(''); // Reset the productAdded message
    } else {
      // Product is not in the cart, add it with quantity 1
      updateCartItems([...existingCartItems, { ...product, quantity: 1 }]);
      setProductAdded('Product added to the Cart');
      setTimeout(() => {
        setProductAdded('');
      }, 3000);
    }
  };

  const incrementQuantity = (product) => {
    console.log('Incrementing quantity for product:', product);
    const updatedItems = existingCartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
    );
    updateCartItems(updatedItems);
    setQuantityUpdate('Item Quantity increased')
    setTimeout(() => {
      setQuantityUpdate('');
    }, 1000);
  };

  const decrementQuantity = (product) => {
    console.log('Decrementing quantity for product:', product);
    const updatedItems = existingCartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: Math.max((item.quantity || 0) - 1, 0) } : item
    );
    updateCartItems(updatedItems);
    setQuantityUpdate('Item Quantity decreased')
    setTimeout(() => {
      setQuantityUpdate('');
    }, 1000);
    
  };

  return (
    <div className=''>
      <Navbar existingCartItems={existingCartItems} />
    <Routes>
        <Route path='/products/:id' element={<ProductDetails />}></Route>
        <Route path='/' element={<ProductList addToCart={addToCart}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        updateCartItems={updateCartItems}
        cartItems={cartItems}
        existingCartItems={existingCartItems}
        productAdded={productAdded}
        quantityUpdate={quantityUpdate}

        />}></Route> 
        <Route path='/cart' element={<Cart 
        // cartItems={cartItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        quantityUpdate={quantityUpdate}
        existingCartItems={existingCartItems}
        />}  />
        <Route path='/checkout' element={<Checkout />}></Route>

    </Routes>
    
    </div>
  );
}

export default App;

