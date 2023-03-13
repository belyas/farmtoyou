import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';

export default function UpdatePersonalInfo() {
  return (
    <>
      <Grid container>
        <Grid
          item
          md={6}
          xs={12}
        >
          <InputLabel htmlFor="name">First Name</InputLabel>
          <Input id="user-name" />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
        >
          <InputLabel htmlFor="name">Last Name</InputLabel>
          <Input id="user-name" />
        </Grid>
      </Grid>
      <Grid sx={{ pt: 2 }}>
        <Button variant="contained">Save</Button>
      </Grid>
    </>
  );
}
