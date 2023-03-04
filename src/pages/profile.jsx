import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import { redirect, supabase } from '@/utils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react'



export default function Profile({ user }) {
  const session = useSession();
  const [loading, setLoading] = useState(true);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);

  async function updateProfile({ firstname, lastname }) {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        firstname: firstname,
        lastname: lastname,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) throw error;

      alert('Profile updated!');
    } catch (error) {
      alert('Error updating the data!');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // const onFinish = async (values) => {
  //   // const { valuesUpdated } = await supabase
  //   //   .from('profiles')
  //   //   .update({
  //   //     firstname: values.firstname,
  //   //     lastname: values.lastname
  //   //   }
  //   //   )
  //   //   .match({ id: session.user.id })
  //   updateProfile({ firstname, lastname })
  //   console.log('Success:', values);
  // };
  // const onFinishFailed = (errorInfo) => {
  //   console.log('Failed:', errorInfo);
  // };
  // this logs user's information if needed to be passed down to Account component
  console.log('user:', user);

  if (!session) {
    redirect({ timer: 0 });
    return null;
  }

  return (
    <>
      <Head>
        <title>Your Profile</title>
        <meta
          name="description"
          content="Connect farmers with locals for fresh food"
        />
      </Head>
      <main
        className="container"
        style={{ padding: '50px 0 100px 0' }}
      >
        <Card>
          <CardContent>
            <AccountCircleIcon></AccountCircleIcon>
            <Typography gutterBottom variant="h5" component="div">
              {user.firstname + " " + user.lastname}
            </Typography>
            <Typography gutterBottom variant="h5" component="div">
              {user.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {user.user_type}
            
            </Typography>
          </CardContent>
        </Card>
        {/* <Account session={session} /> */}
      </main>
    </>
  );
}

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

  const { data } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

  return {
    props: {
      initialSession: session,
      user: { ...session.user, ...data },
    },
  };
};




