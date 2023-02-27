import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const isBrowser = typeof window !== undefined;
console.log('is browser?', isBrowser);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (isBrowser) {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(cart => (cart = JSON.parse(savedCart)));
      } else {
        try {
          localStorage.setItem('cart', cart);
        } catch (error) {
          throw error;
        }
      }
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
  const remove = (id, removeQuantity) => {
    const itemIndex = itemIds.findIndex(i => i === parseInt(id));
    const itemQuantity = cart[itemIndex].quantity;
    if (removeQuantity >= itemQuantity) {
      //delete item completely
      const newCart = cart.filter(c => c.id !== id);
      setCart(cart => (cart = newCart));
    } else {
      //only modify quantity
      const newCart = cart.map((c, index) => {
        if (index === itemIndex) {
          return { ...c, quantity: c.quantity - removeQuantity };
        } else {
          return c;
        }
      });
      setCart(cart => (cart = newCart));
    }
  };
  const clear = () => {
    setCart([]);
    if (isBrowser) {
      localStorage.removeItem('cart');
    }
  };

  useEffect(() => {
    if (isBrowser) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (error) {
        throw error;
      }
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart: { cart: cart, add: add, remove: remove, clear: clear } }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
