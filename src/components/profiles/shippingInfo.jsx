import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function ShippingInfo({ profile }) {
  return (
    <React.Fragment>
      <Typography
        component="p"
        variant="h4"
      >
        Shipping Address
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ flex: 1 }}
      >
        email address
      </Typography>
      <Link href="/profiles/edit">Edit</Link>
    </React.Fragment>
  );
}
