import Head from 'next/head';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import HomeProducts from '@/components/products';
import { getURL } from '@/utils';
import HomeLayout from '@/components/layout/homeLayout';
import React from 'react';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();
  let productsData = {};
  let error = {};

  try {
    productsData = await fetch(`${getURL()}api/products`).then(res => res.json());
  } catch (error) {
    error = error;
  }

  return {
    props: {
      productsData,
      error,
      initialSession: session,
    },
  };
}

export default function Home({ productsData }) {
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
        <HomeLayout productsData={productsData.data} />
      </main>
    </>
  );
}
