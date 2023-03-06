import { Typography } from '@mui/material';

const PaymentMethod = ({ order }) => {
  console.log(typeof order.card_number);
  const cardNumber = '*'.repeat(12) + order.card_number.toString().substring(12);
  return (
    <>
      <Typography variant="subtitle1">{order.card_holder.toUpperCase()}</Typography>
      <Typography variant="body1">{cardNumber}</Typography>
      <Typography variant="body1">Expiration Date:{order.expiration_date} </Typography>
      <Typography variant="body1">CVV:{order.card_cvv}</Typography>
    </>
  );
};

export default PaymentMethod;
