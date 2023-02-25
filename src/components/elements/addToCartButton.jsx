import { CartContext } from '@/cart/cartContext';
import Button from '@mui/material/Button';
import { useContext } from 'react';

const AddToCartButton = ({ product, quantity }) => {
  //quantity is passed seperately because on home page, quantity default is 1
  //but on product page, user can select quantity
  const { cart } = useContext(CartContext);

  const handleClick = e => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      photo: product.title,
      quantity: quantity,
    };

    cart.add(product.id, cartItem);
  };
  return (
    <Button
      variant="contained"
      onClick={e => handleClick(e)}
    >
      Add to cart
    </Button>
  );
};
export default AddToCartButton;
