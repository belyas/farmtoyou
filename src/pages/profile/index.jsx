import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import isUserFarmer from '@/utils/getFarmerId';
import Profile from '@/components/profiles/Profile';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Title from '@/components/profiles/Title';
import PaymentInfo from '@/components/profiles/paymentInfo';
import ShippingInfo from '@/components/profiles/shippingInfo';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from 'next/link';
import { useState } from 'react';
import BreadCrumbs from '@/components/breadCrumbs';

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
  let addressResult = await supabase.from('addresses').select('*').eq('profile_id', session.user.id).single();
  let profileResult = await supabase.from('profiles_extension').select('*').eq('id', session.user.id).single();
  const profile = profileResult.data;

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

export default function ProfileHome({ profile, payment, address, shop }) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //error handling
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <>
      <Box sx={{ pb: 3 }}>
        <BreadCrumbs child={'Profile'} />
      </Box>
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
              <Profile
                profile={profile}
                shop={shop}
                showError={showError}
                setShowError={setShowError}
                showSuccess={showSuccess}
                setShowSuccess={setShowSuccess}
              />
            </Paper>
          </Grid>
        </TabPanel>

        <TabPanel
          value={value}
          index={2}
        >
          <ShippingInfo
            address={address}
            showError={showError}
            setShowError={setShowError}
            showSuccess={showSuccess}
            setShowSuccess={setShowSuccess}
          />
        </TabPanel>
        <TabPanel
          value={value}
          index={3}
        >
          <PaymentInfo
            payment={payment}
            showError={showError}
            setShowError={setShowError}
            showSuccess={showSuccess}
            setShowSuccess={setShowSuccess}
          />
        </TabPanel>
      </Box>
    </>
  );
}
