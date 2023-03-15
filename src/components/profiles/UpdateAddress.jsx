import { Grid } from '@mui/material';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import { Button } from '@mui/material';

export default function UpdateAddress({ address }) {
  return (
    <>
      <Grid container>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">First Name</InputLabel>
          <Input id="user-name" />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">Last Name</InputLabel>
          <Input id="user-name" />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">Phone</InputLabel>
          <Input id="user-name" />
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">Address 1</InputLabel>
          <Input id="user-name" />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">Address 2</InputLabel>
          <Input id="user-name" />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">Country</InputLabel>
          <Input id="user-name" />
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">City</InputLabel>
          <Input id="user-name" />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">Province</InputLabel>
          <Input id="user-name" />
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
        >
          <InputLabel htmlFor="name">Postal Code</InputLabel>
          <Input id="user-name" />
        </Grid>
      </Grid>
      <Grid sx={{ pt: 2 }}>
        <Button variant="contained">Save</Button>
      </Grid>
    </>
  );
}
