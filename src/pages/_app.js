import '@/styles/globals.css';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { CartProvider } from '@/components/cart/cartContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Layout from '@/components/layout/Layout';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4e7c5f',
    },
  },
});

export default function App({ Component, pageProps }) {
  const [supabase] = useState(() => createBrowserSupabaseClient());

  return (
    <ThemeProvider theme={theme}>
      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <CartProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </CartProvider>
      </SessionContextProvider>
    </ThemeProvider>
  );
}
