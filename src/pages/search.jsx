import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import Products from '@/components/products';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const query = ctx.query.q;

  const { data } = await supabase.from('products').select('*').textSearch('fts', query).limit(12);

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
