import Button from '@mui/material/Button';
import { CartContext } from './cartContext';
import { useContext } from 'react';

const RemoveFromCartButton = ({ id }) => {
  const { cart } = useContext(CartContext);

  const handleClick = () => {
    //pass id and quantity to cartContext
    cart.remove(id);
  };
  return <Button onClick={handleClick}>Remove</Button>;
};

export default RemoveFromCartButton;
