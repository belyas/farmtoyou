import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function ShopInfo({ shop }) {
  console.log('shop', shop);
  const theme = useTheme();

  return (
    <>
      <Card sx={{ display: 'flex', boxShadow: 'none' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography
            component="p"
            variant="h6"
          >
            {shop.shop_name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {shop.shop_description}
          </Typography>
        </CardContent>
        {shop.shop_logo ? (
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`/images/${shop.shop_logo}`}
            alt="shop logo"
          />
        ) : (
          <CardMedia
            component="img"
            sx={{ width: 151 }}
            image={`/images/default-veggie.jpg`}
            alt="shop logo"
          />
        )}
      </Card>
    </>
  );
}
