import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

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
          <CardMedia
            sx={{ height: 140 }}
            image="http://placekitten.com/200/300"
            title="placeholder kitten"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {product.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
              {product.description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
            >
              {product.price}
            </Typography>
          </CardContent>

          <CardActions>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
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
