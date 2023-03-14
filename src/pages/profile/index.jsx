import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import { redirect, supabase } from '@/utils';
import React from 'react';
import isUserFarmer from '@/utils/getFarmerId';
import BasicProfile from '@/components/profiles/basicProfile';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Title from '@/components/profiles/Title';
import PaymentInfo from '@/components/profiles/paymentInfo';
import ShippingInfo from '@/components/profiles/shippingInfo';
import ShopInfo from '@/components/profiles/Shop';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeIcon from '@mui/icons-material/Home';
import PaymentIcon from '@mui/icons-material/Payment';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import Link from 'next/link';

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

  console.log('shop', shopResult.data);

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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`,
  };
}

export default function Profile({ profile, payment, address, shop }) {
  console.log('shop', shop);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Grid sx={{ pb: 2 }}>
          <Title title={`Welcome Back ${profile.firstname} !`} />
        </Grid>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="profile tabs"
          >
            <Tab
              label="My orders"
              {...a11yProps(0)}
            />
            <Tab
              label="My information"
              {...a11yProps(1)}
            />

            <Tab
              label="My address"
              {...a11yProps(2)}
            />
            <Tab
              label="Saved Payment"
              {...a11yProps(3)}
            />
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}
        >
          <Link href="/orders">Go to Orders</Link>
        </TabPanel>
        <TabPanel
          value={value}
          index={1}
        >
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
              <BasicProfile
                profile={profile}
                shop={shop}
              />
            </Paper>
          </Grid>
        </TabPanel>

        <TabPanel
          value={value}
          index={2}
        >
          <ShippingInfo address={address} />
        </TabPanel>
        <TabPanel
          value={value}
          index={3}
        >
          <PaymentInfo payment={payment} />
        </TabPanel>
      </Box>
    </>
  );
}
