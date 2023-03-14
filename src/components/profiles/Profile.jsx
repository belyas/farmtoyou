import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import ShopInfo from './Shop';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { useState } from 'react';
import UpdateProfile from './UpdateProfile';

export default function BasicProfile({ profile, shop }) {
  const [edit, setEdit] = useState(false);

  console.log('edit', edit);
  const handleClick = () => {
    setEdit(edit => !edit);
  };

  return (
    <>
      {edit ? (
        <UpdateProfile
          profile={profile}
          shop={shop}
          setEdit={setEdit}
        />
      ) : (
        <Grid container>
          <Grid
            item
            md
          >
            <Typography
              component="p"
              variant="h5"
            >
              {profile.firstname} {profile.lastname}
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ flex: 1 }}
            >
              {profile.email}
            </Typography>
          </Grid>
          {shop ? (
            <Grid
              item
              md={6}
            >
              <ShopInfo shop={shop} />
            </Grid>
          ) : null}
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ pt: 2 }}
          >
            <Button
              variant="contained"
              onClick={handleClick}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
