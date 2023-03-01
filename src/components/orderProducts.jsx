import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function OrderProducts({ order }) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <Item>
            <Typography variant="h4">Order arrives on Friday 02/02/2023</Typography>
          </Item>
        </Grid>
        <Grid
          item
          xs={2}
        >
          <Item>
            <img src="http://placekitten.com/100/100" />
          </Item>
        </Grid>
        <Grid
          item
          xs={8}
        >
          <Item>
            <Link href={`/products/${order.product_id}`}>
              <p>product title and description,click on link go to product page{order.product_title}</p>
            </Link>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
