// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import { Header } from './Header';
// import { Footer } from './Footer';
// import Head from 'next/head';

// const Layout = ({ children }) => {
//   return (
//     <>
//       <Head>
//         <title>Farm to you</title>
//         <meta
//           name="description"
//           content="Connect farmers with locals for fresh food"
//         />
//         <meta
//           name="viewport"
//           content="width=device-width, initial-scale=1"
//         />
//         <link
//           rel="icon"
//           href="/favicon.ico"
//         />
//       </Head>
//       <Header />
//       <main
//         className="container"
//         style={{ padding: '50px 0 100px 0' }}
//       >
//         <Box
//           sx={{
//             bgcolor: 'background.paper',
// <<<<<<< HEAD
//             pt: 8,
//             pb: 6,
//             textAlign: 'center',
//           }}
//         >
//           <Container maxWidth="md">{children}</Container>
// =======
//             textAlign: 'center',
//           }}
//         >
//           <Container
//             maxWidth="lg"
//             sx={{ p: 0 }}
//           >
//             {children}
//           </Container>
// >>>>>>> 228ebb454106687713ce29c51be5af056dce59b2
//         </Box>
//       </main>
//       <Footer />
//     </>
//   );
// };

// export default Layout;
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
            textAlign: 'center',
          }}
        >
          <Container
            maxWidth="lg"
            sx={{ p: 0 }}
          >
            {children}
          </Container>
        </Box>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
