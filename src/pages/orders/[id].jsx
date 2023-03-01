import { supabase } from '@/utils';
import Order from '@/components/order';

export async function getServerSideProps(context) {
  const orderId = context.query.id;
  console.log('order id', orderId);

  try {
    const { data, error } = await supabase.from('order_details').select('*').eq('order_id', orderId).single();
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
