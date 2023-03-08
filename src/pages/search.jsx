import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Products from '@/components/products';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const query = ctx.query.q;
  console.log(query);
  const { data, error } = await supabase.from('products').select('*').textSearch('title', query);
  console.log(data, error);
  return {
    props: { data: data },
  };
}

const SearchPage = ({ data }) => {
  return (
    <>
      <Products productsData={data} />
    </>
  );
};

export default SearchPage;
