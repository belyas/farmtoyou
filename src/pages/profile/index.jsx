import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { redirect, supabase } from '@/utils';
import React from 'react';
import isUserFarmer from '@/utils/getFarmerId';
import BasicProfile from '@/components/profiles/basicProfile';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ListItems } from '@/components/profiles/listItems';
import Title from '@/components/profiles/Title';
import PaymentInfo from '@/components/profiles/paymentInfo';
import ShippingInfo from '@/components/profiles/shippingInfo';
import ShopInfo from '@/components/profiles/Shop';

const mdTheme = createTheme();

export const getServerSideProps = async ctx => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // Check user type, and then decide which table to query
  const farmerId = await isUserFarmer(session.user.id);
  console.log(farmerId);

  let paymentResult = await supabase.from('payments_cencored').select('*').eq('profile_id', session.user.id).single();
  console.log(paymentResult.data);

  let addressResult = await supabase.from('addresses').select('*').eq('profile_id', session.user.id).single();
  console.log('addressdata', addressResult.data);

  let profileResult = await supabase.from('profiles_extension').select('*').eq('id', session.user.id).single();
  const profile = profileResult.data;
  console.log('profile', profile);

  //if farmerId is undefinied, return without shop data
  if (!farmerId) {
    return {
      props: {
        initialSession: session,
        profile: profile,
        payment: paymentResult.data,
        address: addressResult.data,
      },
    };
  }

  //else, return shop data
  let shopResult = await supabase
    .from('farmers_profile_extension')
    .select('*')
    .eq('profile_id', session.user.id)
    .single();

  return {
    props: {
      initialSession: session,
      profile: profileResult.data,
      payment: paymentResult.data,
      address: addressResult.data,
      shop: shopResult.data,
    },
  };
};
//supabase.from('profiles').select('*').eq('id', session.user.id).single();

export default function Profile({ profile, payment, address, shop }) {
  const session = useSession();
  // const [loading, setLoading] = useState(false);
  // const [firstname, setFirstName] = useState(null);
  // const [lastname, setLastName] = useState(null);

  // if (!session) {
  //   redirect({ timer: 0 });
  //   return null;
  // }

  // const handleSave = () => {
  //   updateProfile({ firstname, lastname });
  //   window.location.reload(false);
  // };

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <List component="nav">{ListItems}</List>
          <Box
            component="main"
            sx={{
              backgroundColor: theme =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Container
              maxWidth="lg"
              sx={{ mt: 4, mb: 4 }}
            >
              <Grid sx={{ p: 2 }}>
                <Title title={`Welcome Back ${profile.firstname} !`} />
              </Grid>

              <Grid
                container
                spacing={3}
              >
                <Grid
                  sx={{ p: 2 }}
                  xs={12}
                >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 140,
                    }}
                  >
                    {shop ? <ShopInfo shop={shop} /> : null}
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
                    <BasicProfile profile={profile} />
                  </Paper>
                </Grid>
                {/* Recent Deposits */}
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
                    <PaymentInfo payment={payment} />
                  </Paper>
                </Grid>
                <Grid
                  sx={{ p: 2 }}
                  xs={12}
                >
                  <Paper
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      height: 240,
                    }}
                  >
                    <ShippingInfo address={address} />
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  );
}
