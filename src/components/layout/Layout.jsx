import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Header } from './Header';
import { Footer } from './Footer';
import Head from 'next/head';

const Layout = ({ children }) => {
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
      <Header />
      <main
        className="container"
        style={{ padding: '50px 0 100px 0' }}
      >
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
            textAlign: 'center',
          }}
        >
          <Container maxWidth="md">{children}</Container>
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
