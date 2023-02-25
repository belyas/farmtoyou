import { CartContext } from '@/cart/cartContext';
import Button from '@mui/material/Button';
import { useContext } from 'react';

const AddToCartButton = () => {
  const { cart, add } = useContext(CartContext);
  console.log(cart);

  const handleClick = e => {
    console.log(e);
    console.log('clicked');
    cart.add();
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
