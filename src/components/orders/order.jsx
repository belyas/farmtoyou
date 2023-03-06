import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import OrderProducts from './orderProducts';
import Typography from '@mui/material/Typography';
import ShippingAddress from './shippingAddress';
import PaymentMethod from './paymentMethod';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Order = ({ order }) => {
  return (
    <>
      {order.length ? (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            rowSpacing={1}
            divider={true}
          >
            (
            <Grid
              xs={12}
              rowSpacing={2}
              divider={true}
            >
              <Item>
                <Typography variant="h2">Order Details</Typography>
              </Item>
            </Grid>
            <Grid
              xs={6}
              rowSpacing={2}
            >
              <Item>
                <Typography variant="h5">Shipping Address</Typography>
                <ShippingAddress order={order[0]} />
              </Item>
            </Grid>
            <Grid xs={6}>
              <Item>
                <Typography variant="h5">Payment Method</Typography>
                <PaymentMethod order={order[0]} />
              </Item>
            </Grid>
            <Grid xs={12}>
              <Item>
                <OrderProducts order={order} />
              </Item>
            </Grid>
            )
          </Grid>
        </Box>
      ) : (
        <Typography variant="h5">You have not ordered anything yet</Typography>
      )}
    </>
  );
};

export default Order;
