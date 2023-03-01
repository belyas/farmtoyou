import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import OrderSummary from './oderSummary';
import Link from 'next/link';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function OrderProducts({ order }) {
  console.log('order in orderProducts', order);
  console.log('type of order', typeof order);
  return (
    <Box sx={{ flexGrow: 1 }}>
      {order.map((_order, index) => (
        <Grid
          container
          spacing={2}
          key={index}
        >
          <Grid
            xs={12}
            lg={4}
          >
            <Item>Product photo</Item>
          </Grid>
          <Grid
            container
            xs={12}
            lg={8}
            spacing={4}
          >
            <Grid
              xs={6}
              lg={12}
            >
              <Item>
                <Box
                  id="category-a"
                  sx={{ fontSize: '12px', textTransform: 'uppercase' }}
                >
                  Product delivery info
                </Box>
                <Box
                  component="ul"
                  aria-labelledby="category-a"
                  sx={{ pl: 2 }}
                >
                  <Link href={`/product/${_order.product_id}`}>
                    <OrderSummary order={_order} />
                  </Link>
                </Box>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
