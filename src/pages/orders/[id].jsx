import { supabase } from '@/utils';
import Order from '@/components/order';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function getServerSideProps(context) {
  let orderInfo = {};

  //get user address
  const supabase = createServerSupabaseClient(context);
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
  try {
    const { data, error } = await supabase.from('addresses').select('*').eq('profile_id', session.user.id).single();
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    orderInfo.address = data;
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error } };
  }
  const orderId = context.query.id;
  console.log('order id', orderId);

  try {
    const { data, error } = await supabase
      .from('order_details')
      .select('*,products(photo,delivery_date,delivery_method)')
      .eq('order_id', orderId);

    console.log('data', data);
    console.log('error', error);
    orderInfo.details = data;
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    return { props: { order: orderInfo } };
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error } };
  }
}

export default function OrderPage({ order, error }) {
  const orderFound = error ? false : true;

  return <>{orderFound ? <Order order={order} /> : <p>Page not found</p>}</>;
}
