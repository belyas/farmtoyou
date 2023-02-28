import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from './cartContext';
import { useContext } from 'react';
import Badge from '@mui/material/Badge';

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <Badge badgeContent={cart.totalQuantity()}>
        <ShoppingCartIcon />
      </Badge>
    </div>
  );
};

export default ShoppingCart;
