import { useContext } from 'react';
import Link from 'next/link';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import { CartContext } from './cartContext';

const ShoppingCart = () => {
  const { cart } = useContext(CartContext);

  return (
    <Badge
      badgeContent={cart.totalQuantity()}
      sx={{ mr: 2 }}
      showZero
      color="success"
    >
      <Link href={'/cart/overview'}>
        <ShoppingCartIcon className="addToCartIconTop" />
      </Link>
    </Badge>
  );
};

export default ShoppingCart;
