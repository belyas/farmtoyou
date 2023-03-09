import { CartContext } from '@/components/cart/cartContext';
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
      photo: product.photo,
      farmer_id: product.farmer_id,
      quantity: quantity,
    };

    cart.add(cartItem);
  };
  return (
    <Button
      variant="contained"
      onClick={handleClick}
    >
      Add to cart
    </Button>
  );
};
export default AddToCartButton;
