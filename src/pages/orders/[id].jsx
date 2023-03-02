import Order from '@/components/orders/order';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import typeOfUser from '@/utils/typeOfUser';
import getFarmerId from '@/utils/getFarmerId';

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

  //get order id by in query
  const orderId = context.query.id;

  let orders = [];

  //check if the use is farmer or customer
  const userType = await typeOfUser(session.user.id);

  //get farmer's orders
  if (userType.toUpperCase() === 'FARMER') {
    const farmerId = await getFarmerId(session.user.id);

    try {
      const { data, error } = await supabase.from('orders').select('id').eq('farmer_id', farmerId);
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
      orders = data;
    } catch (error) {
      return { props: { data: 'Internal Server Error.', error } };
    }
  }

  //get customer's orders
  if (userType.toUpperCase() === 'CUSTOMER') {
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
      orders = data;
    } catch (error) {
      return { props: { data: 'Internal Server Error.', error } };
    }
  }

  //check if requested order in orders
  const ordersId = orders.map(_order => _order.id);

  const orderFound = ordersId.findIndex(_id => parseInt(_id) === parseInt(orderId)) !== -1;

  if (!orderFound) {
    return {
      redirect: {
        destination: '/orders',
        permanent: false,
      },
    };
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
