import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const isBrowser = typeof window != undefined;

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    console.log('saved cart', localStorage.getItem('cart'));
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  const add = item => {
    const itemIndex = !cart.length ? -1 : cart.findIndex(_item => parseInt(_item.id) === parseInt(item.id));

    if (itemIndex === -1) {
      //not found, add new item
      setCart(cart => (cart = [...cart, item]));
    } else {
      //if found,update quantity of the found item
      const newCart = cart.map((cartItem, index) => {
        if (index === itemIndex) {
          return { ...cartItem, quantity: cartItem.quantity + item.quantity };
        } else {
          return cartItem;
        }
      });
      setCart(_cart => (_cart = newCart));
    }
  };
  const remove = id => {
    const itemIndex = !cart.length ? -1 : cart.findIndex(_item => parseInt(_item.id) === parseInt(item.id));

    //if found, remove it
    if (itemIndex !== -1) {
      const newCart = cart.filter(cartItem => parseInt(cartItem.id) !== parseInt(id));
      setCart(cart => (cart = newCart));
    }
  };

  const clear = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalQuantity = () => {
    if (cart.length) {
      const itemQuantities = cart.map(i => i.quantity);
      const totalQuantity = itemQuantities.reduce((a, b) => a + b, 0);
      return totalQuantity;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
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
