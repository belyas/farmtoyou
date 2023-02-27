import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const isBrowser = typeof window != undefined;

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  const add = item => {
    const emptyCart = cart.length ? false : true;
    const itemIds = emptyCart ? [] : cart.map(item => item.id);

    const itemIndex = itemIds.findIndex(i => i === parseInt(item.id));

    if (itemIndex === -1) {
      //not found, add new item
      setCart(cart => (cart = [...cart, item]));
    } else {
      //if found,update quantity of the found item
      const newCart = cart.map((c, index) => {
        if (index === itemIndex) {
          return { ...c, quantity: c.quantity + item.quantity };
        } else {
          return c;
        }
      });
      setCart(cart => (cart = newCart));
    }
  };
  const remove = id => {
    const emptyCart = cart.length ? false : true;
    const itemIds = emptyCart ? [] : cart.map(item => item.id);
    const itemIndex = itemIds.findIndex(i => i === parseInt(id));
    //if found, remove it
    if (itemIndex !== -1) {
      const newCart = cart.filter(c => c.id !== id);
      setCart(cart => (cart = newCart));
    }
  };

  const clear = () => {
    setCart([]);
    if (isBrowser) {
      localStorage.removeItem('cart');
    }
  };

  const totalQuantity = () => {
    if (cart.length) {
      const itemQuantities = cart.map(i => i.quantity);
      console.log('itemQuantities', itemQuantities);
      const totalQuantity = itemQuantities.reduce((a, b) => a + b);
      return totalQuantity;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      throw error;
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{ cart: { cart: cart, add: add, remove: remove, clear: clear, totalQuantity: totalQuantity } }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
