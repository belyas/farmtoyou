import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import OrderSummary from './orderSummary';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function OrderProducts({ order }) {
  console.log('order in orderProducts', order);

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
            <Item>
              {_order.photo && _order.photo.endsWith('.jpg') ? (
                <Image
                  src={`/uploads/products/${_order.photo}`}
                  alt="placeholder veggie-basket"
                  title="placeholder veggie-basket"
                  height={300}
                  width={300}
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
            </Item>
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
                  <Typography variant="h5">
                    Product will be delivered on {_order.delivery_date} by {_order.delivery_method}
                  </Typography>
                </Box>
                <Box
                  component="ul"
                  aria-labelledby="category-a"
                  sx={{ pl: 2 }}
                >
                  <Link href={`/products/${_order.product_id}`}>
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
