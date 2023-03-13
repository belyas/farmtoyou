import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function Payment({ payment }) {
  console.log('payment', payment);
  return (
    <React.Fragment>
      <Typography
        component="p"
        variant="h4"
      >
        Payment Card
      </Typography>
      {payment ? (
        <>
          <Typography
            color="text.secondary"
            sx={{ flex: 1 }}
          >
            Card holder: {payment.card_holder.toUpperCase()}
          </Typography>
          <Typography variant="body1">{'*'.repeat(12) + payment.card_number}</Typography>
          <Typography variant="body1">Expiration Date: {payment.expiration_date} </Typography>
          <Typography variant="body1">CVV: ***</Typography>
        </>
      ) : (
        <Typography
          color="text.secondary"
          sx={{ flex: 1 }}
        >
          You have not set up your payment yet.
        </Typography>
      )}
      <Link href="/profiles/edit">Edit</Link>
    </React.Fragment>
  );
}
