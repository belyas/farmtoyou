import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import OrderSummary from './orderSummary';
import Link from 'next/link';
import Image from 'next/image';
import { Typography } from '@mui/material';

export default function OrderProducts({ order }) {
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
            <div
              className="next-image-wrapper"
              style={{ position: 'relative' }}
            >
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
                  fill={true}
                  style={{ objectFit: 'cover' }}
                />
              )}
            </div>
          </Grid>
          <Grid
            container
            xs={12}
            lg={8}
            spacing={4}
          >
            <Grid
              xs={12}
              lg={12}
            >
              <Box id="category-a">
                <div>
                  <span
                    className="headingLg"
                    style={{ fontStyle: 'normal', paddingRight: 5 }}
                  >
                    Delivered by
                  </span>
                  <span className="headingLg headingUppercase">{_order.delivery_method}</span>
                </div>
                <Typography variant="button">Every {_order.delivery_date} </Typography>
              </Box>
              <Box
                container
                aria-labelledby="category-a"
                sx={{ py: 2, textAlign: 'center', margin: 'auto', display: 'grid' }}
              >
                <Link href={`/products/${_order.product_id}`}>
                  <OrderSummary order={_order} />
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}
