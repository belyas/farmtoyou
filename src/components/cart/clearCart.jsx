import Button from '@mui/material/Button';
import { CartContext } from './cartContext';
import { useContext } from 'react';

const ClearCartButton = () => {
  const { cart } = useContext(CartContext);

  return <Button onClick={() => cart.clear()}>Clear</Button>;
};

export default ClearCartButton;
