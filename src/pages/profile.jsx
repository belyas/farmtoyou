import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import { redirect, supabase } from '@/utils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Button, Checkbox, Form, Input } from 'antd';
import React, { useState } from 'react';

export default function Profile({ user }) {
  const session = useSession();
  const [loading, setLoading] = useState(false);
  const [firstname, setFirstName] = useState(null);
  const [lastname, setLastName] = useState(null);
  function refreshPage() {
    window.location.reload(false);
  }

  async function updateProfile() {
    try {
      setLoading(true);

      const updates = {
        id: user.id,
        firstname: firstname,
        lastname: lastname,
      };

      let { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      //console.log(error);
    } finally {
      setLoading(false);
    }
  }
  // this logs user's information if needed to be passed down to Account component
  console.log('user:', user);

  if (!session) {
    redirect({ timer: 0 });
    return null;
  }

  const handleSave = () => {
    updateProfile({ firstname, lastname });
    window.location.reload(false);
  };

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
            <div>
              <h3>NAME : {user.firstname}</h3>
              <h3>SURNAME : {user.lastname}</h3>
            </div>
            <div>
              <h5>Email: {user.email}</h5>
              <h5>Type: {user.user_type}</h5>
            </div>
          </CardContent>
        </Card>
        <Form
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
