import { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import UpdateAddress from './UpdateAddress';

export default function ShippingInfo({ address, showError, setShowError, showSuccess, setShowSuccess }) {
  const [edit, setEdit] = useState(false);

  return (
    <>
      {edit ? (
        <UpdateAddress
          address={address}
          setEdit={setEdit}
          showError={showError}
          setShowError={setShowError}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        />
      ) : (
        <Address
          address={address}
          setEdit={setEdit}
        />
      )}
    </>
  );
}

const Address = ({ address, setEdit }) => {
  return (
    <>
      <Typography
        component="p"
        variant="h4"
        sx={{ my: 2 }}
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
            sx={{ mt: 2 }}
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
            sx={{ mt: 2 }}
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
