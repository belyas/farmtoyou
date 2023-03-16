import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import OrderProducts from './orderProducts';
import Typography from '@mui/material/Typography';
import ShippingAddress from './shippingAddress';
import PaymentMethod from './paymentMethod';
import BreadCrumbs from '../breadCrumbs';

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
      <Box sx={{ pb: 3 }}>
        <BreadCrumbs
          child={'Orders'}
          grandChild={'Details'}
        />
      </Box>
      {order.length ? (
        <Box sx={{ flexGrow: 1, p: 0 }}>
          <Grid
            container
            spacing={2}
            rowSpacing={1}
            divider={true}
          >
            <Grid
              xs={12}
              rowSpacing={2}
              divider={true}
              sx={{ pb: 2 }}
            >
              <Item sx={{ bgcolor: '#3c614a' }}>
                <Typography
                  variant="h5"
                  sx={{ color: 'white' }}
                >
                  My orders
                </Typography>
              </Item>
            </Grid>
            <Grid
              xs={12}
              md={6}
              rowSpacing={2}
              sx={{ pb: 2, pr: 2 }}
            >
              <Item>
                <Typography
                  variant="h5"
                  sx={{ pb: 1 }}
                >
                  Shipping Address
                </Typography>
                <ShippingAddress order={order[0]} />
              </Item>
            </Grid>
            <Grid
              xs={12}
              md={6}
              rowSpacing={2}
              sx={{ pb: 2 }}
            >
              <Item>
                <Typography
                  variant="h5"
                  sx={{ pb: 1 }}
                >
                  Payment Method
                </Typography>
                <Typography variant="body1">Card</Typography>
                <PaymentMethod order={order[0]} />
              </Item>
            </Grid>
            <Grid
              xs={12}
              rowSpacing={2}
              sx={{ pb: 2 }}
            >
              <Item>
                <OrderProducts order={order} />
              </Item>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Typography variant="h5">You have not ordered anything yet</Typography>
      )}
    </>
  );
};

export default Order;
