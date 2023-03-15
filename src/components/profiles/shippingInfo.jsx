import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import UpdateAddress from './UpdateAddress';

const Address = ({ address, setEdit }) => {
  return (
    <>
      <Typography
        component="p"
        variant="h4"
      >
        Shipping Address
      </Typography>
      {address ? (
        <>
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
          <Button
            variant="contained"
            onClick={() => setEdit(edit => !edit)}
          >
            Edit
          </Button>
        </>
      ) : (
        <>
          <Typography
            color="text.secondary"
            sx={{ flex: 1 }}
          >
            You do not have a shipping address yet.
          </Typography>
          <Button
            variant="contained"
            onClick={() => setEdit(edit => !edit)}
          >
            Add Address
          </Button>
        </>
      )}
    </>
  );
};

export default function ShippingInfo({ address }) {
  const [edit, setEdit] = useState(false);
  console.log('edit', edit);

  console.log('address', address);
  return (
    <>
      {edit ? (
        <UpdateAddress />
      ) : (
        <Address
          address={address}
          setEdit={setEdit}
        />
      )}
    </>
  );
}
