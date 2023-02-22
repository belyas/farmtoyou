import { supabase } from '@/utils';
import Product from '@/components/product';

export async function getServerSideProps(context) {
  const productId = context.query.id;
  try {
    const { data, error } = await supabase.from('products').select().eq('id', productId);
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    return { props: { data } };
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error } };
  }
}

export default function ProductPage({ data, error }) {
  const productFound = Boolean(data.length) && !error;

  return (
    <>
      {productFound ? (
        <>
          <Product productData={data} />
        </>
      ) : (
        <p>Page not found</p>
      )}
    </>
  );
}
