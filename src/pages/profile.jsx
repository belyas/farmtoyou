import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import { redirect, supabase } from '@/utils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Button, Form, Input, message } from 'antd';
import UpdateProfileForm from '@/components/profiles/UpdateProfileForm';
import React, { useState } from 'react';
import isUserFarmer from '@/utils/getFarmerId';

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
      <Card>
        <CardContent>
          <AccountCircleIcon></AccountCircleIcon>
          <div>
            <h3>NAME : {profile.firstname}</h3>
            <h3>SURNAME : {profile.lastname}</h3>
          </div>
          <div>
            <h5>Email: {profile.email}</h5>
            {/* <h5>Type: {profile.user_metadata.user_type}</h5> */}
            {/* <h5>{data.shop_name}</h5>
            <h5>{data.shop_description}</h5>
            <h5>{data.shop_logo}</h5> */}
          </div>
        </CardContent>
      </Card>
      <UpdateProfileForm />
      {/* <FormControl
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item label={'Update your profile'}></Form.Item>
          <Form.Item
            htmlFor="firstname"
            name="firstname"
            rules={[
              {
                required: true,
                message: 'Please input your First name!',
              },
            ]}
          >
            Set your First name
            <Input
              id="firstname"
              value={firstname || ''}
              onChange={e => setFirstName(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            htmlFor="lastname"
            name="lastname"
            rules={[
              {
                required: true,
                message: 'Please input your Last name!',
              },
            ]}
          >
            Set your Last name
            <Input
              id="lastname"
              value={lastname || ''}
              onChange={e => setLastName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              onClick={handleSave}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </Button>
          </Form.Item>
        </Form>

      <Account session={session} />
    </>
  );
}
