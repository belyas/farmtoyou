import Typography from '@mui/material/Typography';

const ShippingAddress = ({ address }) => {
  return (
    <>
      <Typography variant="subtitle1">
        {address.firstname} {address.lastname}
      </Typography>
      <Typography variant="body1">
        {address.address_1} {address.address_2}
      </Typography>
      <Typography variant="body1">Postcode:{address.code_postal} </Typography>
      <Typography variant="body1">
        {address.city} {address.province} {address.country}
      </Typography>
      <Typography variant="body1">Contact Number:{address.phone} </Typography>
    </>
  );
};

export default ShippingAddress;
