import Order from '@/components/orders/order';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

export async function getServerSideProps(context) {
  let orderInfo = {};

  //get session
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
  //get order data by query id
  const orderId = context.query.id;

  //check if this user has the requested order
  try {
    const { data, error } = await supabase.from('orders').select('id').eq('profile_id', session.user.id);
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    if (!data.length) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }
    const orderFound = data.findIndex(_order => _order === orderId) !== -1;

    if (!orderFound) {
      return {
        redirect: {
          destination: '/orders',
          permanent: false,
        },
      };
    }
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error } };
  }

  //get user address
  try {
    const { data, error } = await supabase.from('addresses').select('*').eq('profile_id', session.user.id).single();
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    orderInfo.address = data;
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error } };
  }

  //get order details
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
