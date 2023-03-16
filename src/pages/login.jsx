import { useState } from 'react';
import { VIEWS } from '@/components/Auth/constants';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { EmailAuth } from '@/components/Auth/Steps';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function Login() {
  const supabaseClient = useSupabaseClient();
  const [authView, setAuthView] = useState(VIEWS.SIGN_IN);
  const emailProp = {
    supabaseClient,
    setAuthView,
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <EmailAuth
          {...emailProp}
          authView={authView}
        />
      </Box>
    </Container>
  );
}

export const getServerSideProps = async ctx => {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      initialSession: session,
    },
  };
};
