import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import AddToCartButton from './cart/addToCartButton';
import { useState, useEffect } from 'react';

const Products = ({ productsData }) => {
  const products = productsData;

  const productItems = products.map((product, index) => {
    return (
      <Grid
        xs={12}
        sm={4}
        md={4}
        key={index}
      >
        <Card sx={{ maxWidth: 345 }}>
          <Link href={`/products/${product.id}`}>
            <CardMedia
              sx={{ height: 140, backgroundSize: 'contain', my: 1 }}
              image={
                product.photo && product.photo.endsWith('.jpg')
                  ? `/uploads/products/${product.photo}`
                  : '/images/default-veggie.jpg'
              }
              title="placeholder kitten"
            />
          </Link>
          <CardContent>
            <Link href={`/products/${product.id}`}>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
              >
                {product.title}
              </Typography>
            </Link>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
            >
              €{product.price}
            </Typography>
          </CardContent>

          <CardActions sx={{ justifyContent: 'center' }}>
            <AddToCartButton
              product={product}
              quantity={1}
            />
          </CardActions>
        </Card>
      </Grid>
    );
  });
  return (
    <>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {productItems}
      </Grid>
    </>
  );
};

export default Products;
