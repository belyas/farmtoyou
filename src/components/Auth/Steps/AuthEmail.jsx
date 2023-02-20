import { useEffect, useRef, useState } from 'react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { VIEWS, USER_TYPE } from '../constants';
import Link from 'next/link';

function EmailAuth({
  authView = VIEWS.SIGN_IN,
  defaultEmail,
  defaultPassword,
  setAuthView,
  setDefaultEmail,
  setDefaultPassword,
  supabaseClient,
  showLinks = true,
}) {
  const isMounted = useRef(true);
  const [userType, setUserType] = useState(USER_TYPE.CUSTOMER);
  const [email, setEmail] = useState(defaultEmail);
  const [password, setPassword] = useState(defaultPassword);
  const [shop, setStop] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const isSignin = authView === VIEWS.SIGN_IN;
  const isFarmer = authView === VIEWS.SIGN_UP && userType === USER_TYPE.FARMER;

  useEffect(() => {
    isMounted.current = true;
    setEmail(defaultEmail);
    setPassword(defaultPassword);

    return () => {
      isMounted.current = false;
    };
  }, [authView]);

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);

    switch (authView) {
      case VIEWS.SIGN_IN:
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) setError(signInError.message);
        break;
      case VIEWS.SIGN_UP:
        const {
          data: { user: signUpUser, session: signUpSession },
          error: signUpError,
        } = await supabaseClient.auth.signUp({
          email,
          password,
        });

        if (signUpError) {
          setError(signUpError.message);
        } else if (signUpUser && !signUpSession) {
          if (isFarmer) {
            const { error } = await supabaseClient.from('farmers').insert({
              shop_name: shop,
              shop_description: shop + ' description',
              profile_id: signUpUser.id,
            });

            if (error) {
              setError(error.message);
              return;
            }
          }

          setMessage('Check your email for the confirmation link.');
        }
        break;
    }

    /*
     * it is possible the auth component may have been unmounted at this point
     * check if component is mounted before setting a useState
     */
    if (isMounted.current) {
      setLoading(false);
    }
  };

  const handleViewChange = newView => {
    setDefaultEmail(email);
    setDefaultPassword(password);
    setAuthView(newView);
  };

  return (
    <form
      id={isSignin ? `auth-sign-in` : `auth-sign-up`}
      onSubmit={handleSubmit}
      autoComplete={'on'}
      style={{ width: '100%' }}
    >
      <Container maxWidth="sm">
        {!isSignin && (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="user-type"
              name="usertype-buttons-group"
              value={userType}
            >
              <FormControlLabel
                value={USER_TYPE.CUSTOMER}
                control={<Radio />}
                label="Customer"
                onChange={() => setUserType(USER_TYPE.CUSTOMER)}
              />
              <FormControlLabel
                value={USER_TYPE.FARMER}
                control={<Radio />}
                label="Farmer"
                onChange={() => setUserType(USER_TYPE.FARMER)}
              />
            </RadioGroup>
          </FormControl>
        )}
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
          <TextField
            required
            id="password"
            label="password"
            variant="outlined"
            type="password"
            name="password"
            defaultValue={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete={isSignin ? 'current-password' : 'new-password'}
          />
          {isFarmer && (
            <>
              <TextField
                required
                id="shop"
                label="shop name"
                variant="outlined"
                name="shop"
                onChange={e => setStop(e.target.value)}
                autoComplete={'shop'}
              />
            </>
          )}
        </Container>

        <Button
          variant="contained"
          size="small"
          type="submit"
          disabled={loading}
        >
          {loading ? 'loading' : isSignin ? 'login' : 'sign up'}
        </Button>

        {showLinks && (
          <Container maxWidth="sm">
            {isSignin && (
              <Link
                href="#auth-forgot-password"
                onClick={e => {
                  e.preventDefault();
                  setAuthView(VIEWS.FORGOTTEN_PASSWORD);
                }}
              >
                Forgot password?
              </Link>
            )}
            {isSignin ? (
              <Link
                href="#auth-sign-up"
                onClick={e => {
                  e.preventDefault();
                  handleViewChange(VIEWS.SIGN_UP);
                }}
              >
                Sign up
              </Link>
            ) : (
              <Link
                href="#auth-sign-in"
                onClick={e => {
                  e.preventDefault();
                  handleViewChange(VIEWS.SIGN_IN);
                }}
              >
                Sign in
              </Link>
            )}
          </Container>
        )}
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
    </form>
  );
}

export { EmailAuth };
