import '@/styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CartProvider } from '@/components/cart/cartContext';
import ShoppingCart from '@/components/cart/shoppingCart';

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  const route = useRouter();

  return (
    <SessionContextProvider
      supabaseClient={supabase}
      initialSession={pageProps.initialSession}
    >
      <CartProvider>
        {!pageProps?.initialSession && <Link href={'/login'}>Login</Link>}
        {pageProps?.initialSession && (
          <>
            <button
              onClick={async () => {
                await supabase.auth.signOut();
                route.push('/');
              }}
            >
              Sign Out
            </button>{' '}
            | <Link href={'/profile'}>Profile</Link> | <Link href={'/products'}>Products</Link>
          </>
        )}
        <Component {...pageProps} />
        <ShoppingCart />
      </CartProvider>
    </SessionContextProvider>
  );
}
