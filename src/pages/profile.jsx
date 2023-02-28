import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import { redirect } from '@/utils';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Typography from '@mui/material/Typography';

export default function Profile({ user, data }) {
  const session = useSession();

  // this logs user's information if needed to be passed down to Account component
  console.log('user:', user);
  console.log('data:', data);
  //console.log('farmer', farmer)

  if (!session) {
    redirect({ timer: 0 });
    return null;
  }
  const farmerId = user.id;
  if (farmerId === user.profile_id) {
    console.log(farmerId);
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
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {user.firstname + ' ' + user.lastname}
            </Typography>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
            >
              {user.email}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
            >
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

  //const {data } = await supabase.from('profiles').select('*, profiles!inner (*)').eq('profile_id', session.user.id)
  //const { farmer } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();

  // Check user type, and then decide which table to query

  const { data } = await supabase
    .from('farmers_profile_extension')
    .select('*')
    .eq('profile_id', session.user.id)
    .single();
  return {
    props: {
      initialSession: session,
      user: session.user,
      data: data ?? [],
      //farmer: farmer ?? [],
    },
  };
};
//supabase.from('profiles').select('*').eq('id', session.user.id).single();
