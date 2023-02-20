import React, { useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

function UpdatePassword({ supabaseClient }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async () => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    const { error } = await supabaseClient.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setMessage('Your password has been updated');
    }
    setLoading(false);
  };

  return (
    <form
      id="auth-update-password"
      onSubmit={handlePasswordReset}
    >
      <Container maxWidth="sm">
        <Container maxWidth="md">
          <TextField
            required
            id="password"
            label="password"
            variant="outlined"
            type="password"
            name="password"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
          />

          <Button
            variant="contained"
            size="small"
            type="submit"
            disabled={loading}
          >
            {loading ? 'loading' : 'update'}
          </Button>
        </Container>

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

export { UpdatePassword };
