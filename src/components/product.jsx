import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import { Typography, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import AddToCartButton from './elements/addToCartButton';
import SelectProductQuantity from './elements/selectProductQuantity';

const Product = ({ product }) => {
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
          <SelectProductQuantity stock={product.quantity} />
          <AddToCartButton />
        </Grid>
      </Grid>
    </>
  );
};

export default Product;
