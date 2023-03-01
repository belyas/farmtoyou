import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import OrderSummary from './oderSummary';
import OrderProducts from './orderProducts';
import Typography from '@mui/material/Typography';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Order = ({ order }) => {
  console.log('order in Order', order);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
      >
        <Grid xs={12}>
          <Item>
            <Typography variant="h2">Order Details</Typography>
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <Typography variant="h5">Shipping Address</Typography>
          </Item>
        </Grid>
        <Grid xs={6}>
          <Item>
            <Typography variant="h5">Payment Method</Typography>
          </Item>
        </Grid>

        <Grid xs={12}>
          <Item>
            <OrderProducts order={order} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Order;
