import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSessionContext } from '@supabase/auth-helpers-react';

export const getServerSideProps = async ctx => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const { data } = await supabase.from('orders').select('*').eq('profile_id', session.user.id);
  console.log('orders', data);

  return {
    props: {
      orders: data,
    },
  };
};

const Orders = ({ orders }) => {
  console.log(orders);
  return <>Orders </>;
};

export default Orders;
