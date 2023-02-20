import React, { useState } from 'react';
import { VIEWS } from '../constants';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function ForgottenPassword({ setAuthView, supabaseClient, redirectTo, showLinks }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async e => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { error } = await supabaseClient.auth.resetPasswordForEmail(email, {
      redirectTo,
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Check your email for the password reset link');
    }
    setLoading(false);
  };

  return (
    <form
      id="auth-forgot-password"
      onSubmit={handlePasswordReset}
    >
      <Container maxWidth="sm">
        <Container maxWidth="md">
          <TextField
            required
            id="email"
            label="email"
            variant="outlined"
            autoComplete="email"
            defaultValue={email}
            type="email"
            name="email"
            onChange={e => setEmail(e.target.value)}
          />

          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={loading}
          >
            {loading ? 'loading' : 'Send'}
          </Button>
        </Container>

        {showLinks && (
          <Container maxWidth="sm">
            <Link
              href="#auth-sign-in"
              onClick={e => {
                e.preventDefault();
                setAuthView(VIEWS.SIGN_IN);
              }}
            >
              Sign in
            </Link>
          </Container>
        )}

        {message && (
          <Stack
            sx={{ width: '100%' }}
            spacing={2}
          >
            <Alert severity="success">{message}</Alert>
          </Stack>
        )}
        {error && (
          <Stack
            sx={{ width: '100%' }}
            spacing={2}
          >
            <Alert severity="error">{error}</Alert>
          </Stack>
        )}
      </Container>
    </form>
  );
}

export { ForgottenPassword };
