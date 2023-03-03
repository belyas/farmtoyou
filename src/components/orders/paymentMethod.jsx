import { Typography } from '@mui/material';

const PaymentMethod = ({ order }) => {
  return (
    <>
      <Typography variant="subtitle1">{order.card_holder}</Typography>
      <Typography variant="body1">{order.card_number}</Typography>
      <Typography variant="body1">Expiration Date:{order.expiration_date} </Typography>
      <Typography variant="body1">CVV:{order.card_cvv}</Typography>
    </>
  );
};

export default PaymentMethod;
