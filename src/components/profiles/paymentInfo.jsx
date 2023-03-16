import * as React from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UpdatePayment from './UpdatePayment';

export default function Payment({ payment, showError, setShowError, showSuccess, setShowSuccess }) {
  // console.log('payment', payment);
  const [edit, setEdit] = React.useState(false);

  return (
    <React.Fragment>
      {edit ? (
        <UpdatePayment
          payment={payment}
          setEdit={setEdit}
          showError={showError}
          setShowError={setShowError}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        />
      ) : (
        <>
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
          <Button
            variant="contained"
            onClick={() => setEdit(edit => !edit)}
          >
            Edit
          </Button>
        </>
      )}
    </React.Fragment>
  );
}
