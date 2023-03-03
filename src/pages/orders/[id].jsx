import Order from '@/components/orders/order';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
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

  //check if the use is farmer
  const farmerId = await getFarmerId(session.user.id);

  //if farmer, check if the requested order id belongs to this farmer
  if (farmerId) {
    try {
      const { data, error } = await supabase.from('orders').select('*').match({ farmer_id: farmerId, id: orderId });

      if (error) {
        throw typeof error === 'string' ? new Error(error) : error;
      }
      if (!data.length) {
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
  }

  //See if this customer has the order
  if (!farmerId) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id')
        .match({ profile_id: session.user.id, id: orderId });
      if (error) {
        throw typeof error === 'string' ? new Error(error) : error;
      }
      if (!data.length) {
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
  }

  //get the order information
  try {
    const { data, error } = await supabase.from('order_details_extension').select('*').eq('order_id', orderId);
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    return { props: { order: data } };
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error } };
  }
}

export default function OrderPage({ order, error }) {
  const orderFound = error ? false : true;

  return <>{orderFound ? <Order order={order} /> : <p>Page not found</p>}</>;
}
