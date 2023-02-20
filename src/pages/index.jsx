import Head from 'next/head';
// import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import Account from '@/components/Account';
import Auth from '@/components/Auth';

// const inter = Inter({ subsets: ['latin'] })

export default function Home() {
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
          <Auth
            supabaseClient={supabase}
            showLinks={true}
          />
        ) : (
          <Account session={session} />
        )}
      </main>
    </>
  );
}
