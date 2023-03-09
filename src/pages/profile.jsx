import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import { redirect } from '@/utils';

export default function Profile({ user }) {
  const session = useSession();

  // this logs user's information if needed to be passed down to Account component
  console.log('user:', user);

  if (!session) {
    redirect({ timer: 0 });
    return null;
  }

  return (
    <>
      <Account session={session} />
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
