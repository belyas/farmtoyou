import UpdateProfileForm from '@/components/profiles/updateProfileForm';
import Account from '@/components/Account';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';

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
  return (
    <>
      <Grid>My data</Grid>
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
            {' '}
            My personal info
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
              height: 140,
            }}
          >
            Change password
          </Paper>
        </Grid>
      </Grid>
      <UpdateProfileForm />
      <Account session={session} />
    </>
  );
}
