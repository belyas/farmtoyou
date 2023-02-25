import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  console.log('cart', cart);

  const itemIds = cart.length ? cart.map(item => item.id) : [];
  console.log('item ids', itemIds);

  const add = (id, item) => {
    const itemIndex = itemIds.findIndex(i => i === parseInt(id));

    if (itemIndex === -1) {
      //not found, add new item
      setCart([...cart, item]);
    } else {
      //if found,update quantity of the found item
      const newCart = cart.map((c, index) => {
        if (index === itemIndex) {
          return { ...c, quantity: c.quantity + item.quantity };
        } else {
          return c;
        }
      });
      setCart(newCart);
    }
  };
  const remove = () => {};
  const clear = () => {};

  //   useEffect(() => {
  //     const isCart = window.localStorage.getItem('cart');
  //     console.log(isCart);
  //   }, []);

  return (
    <CartContext.Provider value={{ cart: { cart: cart, add: add, remove: remove } }}>{children}</CartContext.Provider>
  );
};

export { CartContext, CartProvider };
