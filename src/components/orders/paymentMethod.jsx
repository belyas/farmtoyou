import { Typography } from '@mui/material';

const PaymentMethod = ({ order }) => {
  const cardNumber = '*'.repeat(12) + order.card_number;
  return (
    <>
      <Typography variant="subtitle1">{order.card_holder.toUpperCase()}</Typography>
      <Typography variant="body1">{cardNumber}</Typography>
      <Typography variant="body1">Expiration Date: {order.expiration_date} </Typography>
      <Typography variant="body1">CVV: ***</Typography>
    </>
  );
};

export default PaymentMethod;
