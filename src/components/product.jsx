import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import AddToCartButton from './cart/addToCartButton';
import SelectProductQuantity from './elements/selectProductQuantity';
import { useState } from 'react';

const Product = ({ product }) => {
  const [quantity, SetQuantity] = useState(1);

  return (
    <Grid
      container
      // spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        xs={12}
        md={6}
      >
        {product.photo && product.photo.endsWith('.jpg') ? (
          <Image
            src={`/uploads/products/${product.photo}`}
            title="placeholder veggie-basket"
            height={300}
            width={300}
            alt={product.title}
          />
        ) : (
          <Image
            src="/images/default-veggie.jpg"
            title="placeholder veggie-basket"
            alt="placeholder veggie-basket"
            height={300}
            width={300}
          />
        )}
      </Grid>
      <Grid
        xs={12}
        md={6}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          gutterBottom
          variant="h3"
        >
          {product.title}
        </Typography>
        <Typography
          gutterBottom
          variant="h5"
        >
          € {product.price}
        </Typography>
        <Typography
          gutterBottom
          variant="subtitle1"
        >
          {product.description}
        </Typography>
        <SelectProductQuantity
          stock={product.quantity}
          setQuantity={SetQuantity}
          quantity={quantity}
        />
        <AddToCartButton
          product={product}
          quantity={quantity}
        />
      </Grid>
    </Grid>
  );
};

export default Product;
