import UpdatePersonalInfo from '@/components/profiles/UpdatePersonalInfo';
import Account from '@/components/Account';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { Grid, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const getServerSideProps = async ctx => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return {
    props: {
      session: session,
    },
  };
};

export default function EditProfile({ session }) {
  const [address, SetAddress] = useState('');
  const showAddressForm = () => {};
  return (
    <>
      <Grid
        container
        sx={{ pb: 4 }}
        spacing={2}
      >
        <Grid item>
          <Button variant="contained">Info</Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={showAddressForm}
          >
            <Link href="/profile/address">Address</Link>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained">Payment</Button>
        </Grid>
      </Grid>
      <Grid container>
        <Grid
          item
          xs={12}
          md={6}
        >
          {' '}
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <UpdatePersonalInfo />
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Account session={session} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
