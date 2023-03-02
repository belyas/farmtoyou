import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { CartContext } from './cartContext';
import { useContext } from 'react';
import Badge from '@mui/material/Badge';
import Link from 'next/link';

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);

  return (
    <div>
      <Badge badgeContent={cart.totalQuantity()}>
      <Link href={'/cart/overview'}><ShoppingCartIcon /></Link>
      </Badge>
    </div>
  );
};

export default ShoppingCart;
