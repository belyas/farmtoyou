import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { Typography } from '@mui/material';

const Product = ({ productData }) => {
  console.log('productdata', productData);
  console.log('product title', productData.title);
  const product = productData[0];

  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid
          xs={12}
          md={6}
        >
          <Image
            src="/images/veggie-basket.jpg"
            title="placeholder veggie-basket"
            height={500}
            width={500}
          />
        </Grid>
        <Grid
          xs={12}
          md={6}
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
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
