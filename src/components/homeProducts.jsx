import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from 'next/link';
import AddToCartButton from './elements/addToCartButton';

//TODO add real route to each card
const HomeProducts = ({ productsData }) => {
  const products = productsData.data;

  const productItems = products.map((product, index) => {
    return (
      <Grid
        xs={2}
        sm={4}
        md={4}
        key={index}
      >
        <Card sx={{ maxWidth: 345 }}>
          <Link href={`/products/${product.id}`}>
            <CardMedia
              sx={{ height: 140 }}
              image="http://placekitten.com/200/300"
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

          <CardActions>
            <AddToCartButton />
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

export default HomeProducts;
