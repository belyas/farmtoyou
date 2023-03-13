import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function ShippingInfo({ address }) {
  console.log('address', address);
  return (
    <React.Fragment>
      <Typography
        component="p"
        variant="h4"
      >
        Shipping Address
      </Typography>
      {address ? (
        <address>
          <Typography variant="subtitle1">
            {address.firstname} {address.lastname}
          </Typography>
          <Typography variant="body1">
            {address.address_1} {address.address_2}
          </Typography>
          <Typography variant="body1">Postcode: {address.code_postal} </Typography>
          <Typography variant="body1">
            {address.city} {address.province} {address.country}
          </Typography>
          <Typography variant="body1">Contact Number: {address.phone} </Typography>
        </address>
      ) : (
        <Typography
          color="text.secondary"
          sx={{ flex: 1 }}
        >
          You do not have a shipping address yet.
        </Typography>
      )}

      <Link href="/profile/edit">Edit</Link>
    </React.Fragment>
  );
}
