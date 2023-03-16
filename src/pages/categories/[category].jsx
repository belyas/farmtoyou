import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import HomeProducts from '@/components/products';
import BreadCrumbs from '@/components/breadCrumbs';

export async function getServerSideProps(ctx) {
  const category = ctx.query.category;
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let productsData = {};
  let error = {};

  try {
    const { data, error } = await supabase.from('products').select('*').contains('category', [category]);
    productsData = data;
  } catch (error) {
    error = error;
  }

  return {
    props: {
      category: category,
      productsData,
      error,
      initialSession: session,
    },
  };
}

const CategoryPage = ({ category, productsData }) => {
  return (
    <>
      <Head>
        <title>Farm to you</title>
        <meta
          name="description"
          content="Connect farmers with locals for fresh food"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <main
        className="container"
        style={{ padding: '50px 0 100px 0' }}
      >
        <BreadCrumbs
          child={'Category'}
          grandChild={category}
        />
        <HomeProducts productsData={productsData} />
      </main>
    </>
  );
};

export default CategoryPage;
