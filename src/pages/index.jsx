import Head from 'next/head';
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import Auth from '@/components/Auth';
import HomeProducts from '@/components/homeProducts';

// const inter = Inter({ subsets: ['latin'] })
export async function getServerSideProps() {
  try {
    const productsData = await fetch('http://localhost:3000/api/products').then(res => res.json());
    return { props: { productsData } };
  } catch (error) {
    return error;
  }
}

export default function Home({ productsData }) {
  const session = useSession();
  const supabase = useSupabaseClient();

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
        {!session ? (
          <div>
            <HomeProducts productsData={productsData} />
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              theme="dark"
            />
          </div>
        ) : (
          <Account session={session} />
        )}
      </main>
    </>
  );
}
