import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(0);
  console.log(cart);

  const add = () => {
    setCart(cart + 1);
  };
  const remove = () => {
    setCart(cart - 1);
  };

  //   useEffect(() => {
  //     const isCart = window.localStorage.getItem('cart');
  //     console.log(isCart);
  //   }, []);

  return (
    <CartContext.Provider value={{ cart: { cart: cart, add: add, remove: remove } }}>{children}</CartContext.Provider>
  );
};

export { CartContext, CartProvider };
