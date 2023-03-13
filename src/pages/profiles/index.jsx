import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { redirect, supabase } from '@/utils';
import UpdateProfileForm from '@/components/profiles/UpdateProfileForm';
import React, { useState } from 'react';
import isUserFarmer from '@/utils/getFarmerId';
import BasicProfile from '@/components/profiles/basicProfile';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { ListItems } from '@/components/profiles/listItems';
import Orders from '@/components/profiles/orders';
import Title from '@/components/profiles/Title';
import Order from '@/components/orders/order';
import PaymentInfo from '@/components/profiles/paymentInfo';
import ShippingInfo from '@/components/profiles/shippingInfo';

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

  //if farmerId is undefinied, means the user is not a farmer, go ahead and query profiles table
  if (!farmerId) {
    const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
    console.log('profile', data);
    return {
      props: {
        initialSession: session,
        profile: data,
      },
    };
  }

  //if farmerId, means the user is a farmer,query farmer view table
  const { data } = await supabase
    .from('farmers_profile_extension')
    .select('*')
    .eq('profile_id', session.user.id)
    .single();

  return {
    props: {
      initialSession: session,
      profile: data,
      //farmer: farmer ?? [],
    },
  };
};
//supabase.from('profiles').select('*').eq('id', session.user.id).single();

export default function Profile({ profile }) {
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
                {/* Chart */}
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
                    <PaymentInfo />
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
                    <ShippingInfo />
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
