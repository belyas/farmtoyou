import { CartContext } from '@/cart/cartContext';
import Button from '@mui/material/Button';
import { useContext } from 'react';

const AddToCartButton = () => {
  const cart = useContext(CartContext);
  console.log(cart);

  const handleClick = e => {
    console.log(e);
  };
  return (
    <Button
      variant="contained"
      onClick={e => {
        handleClick(e);
      }}
    >
      Add to cart
    </Button>
  );
};
export default AddToCartButton;
