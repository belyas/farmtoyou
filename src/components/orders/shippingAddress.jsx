import Typography from '@mui/material/Typography';

const ShippingAddress = ({ order }) => {
  return (
    <address>
      <Typography variant="subtitle1">
        {order.firstname} {order.lastname}
      </Typography>
      <Typography variant="body1">
        {order.address_1} {order.address_2}
      </Typography>
      <Typography variant="body1">Postcode:{order.code_postal} </Typography>
      <Typography variant="body1">
        {order.city} {order.province} {order.country}
      </Typography>
      <Typography variant="body1">Contact Number:{order.phone} </Typography>
    </address>
  );
};

export default ShippingAddress;
