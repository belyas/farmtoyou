import '@/styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      {!pageProps?.initialSession && <Link href={'/login'}>Login</Link>}
      {pageProps?.initialSession && (
        <>
          <button onClick={() => supabase.auth.signOut()}>Sign Out</button> | <Link href={'/profile'}>Profile</Link>{' '}
        </>
      )}
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}
