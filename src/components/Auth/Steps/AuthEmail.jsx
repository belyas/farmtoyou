import { useEffect, useRef, useState, useReducer } from 'react';
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
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { redirect } from '@/utils';
import { authReducer, initialState } from './authReducer';

function EmailAuth({ authView = VIEWS.SIGN_IN, setAuthView, supabaseClient }) {
  const [data, dispatch] = useReducer(authReducer, initialState);
  const isMounted = useRef(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const isSignin = authView === VIEWS.SIGN_IN;
  const isSignup = authView === VIEWS.SIGN_UP;
  const isForgotPassword = authView === VIEWS.FORGOTTEN_PASSWORD;
  const isFarmer = isSignup && data.userType === USER_TYPE.FARMER;

  useEffect(() => {
    isMounted.current = true;

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
          email: data.email,
          password: data.password,
        });

        if (signInError) {
          setError(signInError.message);
        } else {
          setMessage('You have successfully been logged in.');
          redirect({ timer: 500 });
        }
        break;
      case VIEWS.SIGN_UP:
        if (data.password !== data.confPassword) {
          setError('Double check password is correct.');
          setLoading(false);
          return;
        }

        const {
          data: { user: signUpUser, session: signUpSession },
          error: signUpError,
        } = await supabaseClient.auth.signUp({
          email: data.email,
          password: data.password,
          options: {
            data: {
              firstname: data.firstname,
              lastname: data.lastname,
              user_type: data.userType,
            },
          },
        });

        if (signUpError) {
          setError(signUpError.message);
        } else if (signUpUser && !signUpSession) {
          if (isFarmer) {
            const { error } = await supabaseClient.from('farmers').insert({
              shop_name: data.shop,
              shop_description: data.shopDescription,
              profile_id: signUpUser.id,
            });

            if (error) {
              setError(error.message);
              return;
            }
          }

          setMessage('Check your email for the confirmation link.');
          redirect({ timer: 500 });
        }
        break;
      case VIEWS.FORGOTTEN_PASSWORD:
        const { error } = await supabaseClient.auth.resetPasswordForEmail(data.email);

        if (error) {
          setError(error.message);
        } else {
          setMessage('Check your email for the password reset link');
          redirect({ timer: 500 });
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

  const messages = (
    <>
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
    </>
  );

  if (isSignin) {
    return (
      <>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {messages}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={e => dispatch({ payload: e.target.value, type: 'changeEmail' })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={e => dispatch({ payload: e.target.value, type: 'changePassword' })}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#auth-forgot-password"
                onClick={e => {
                  e.preventDefault();
                  setAuthView(VIEWS.FORGOTTEN_PASSWORD);
                }}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#auth-sign-up"
                onClick={e => {
                  e.preventDefault();
                  setAuthView(VIEWS.SIGN_UP);
                }}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  if (isSignup) {
    return (
      <>
        <Typography
          component="h1"
          variant="h5"
        >
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {messages}
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="user-type"
              name="usertype-buttons-group"
              value={data.userType}
            >
              <FormControlLabel
                value={USER_TYPE.CUSTOMER}
                control={<Radio />}
                label="Customer"
                onChange={() => dispatch({ type: 'changeUserType', payload: USER_TYPE.CUSTOMER })}
              />
              <FormControlLabel
                value={USER_TYPE.FARMER}
                control={<Radio />}
                label="Farmer"
                onChange={() => dispatch({ type: 'changeUserType', payload: USER_TYPE.FARMER })}
              />
            </RadioGroup>
          </FormControl>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            onChange={e => dispatch({ payload: e.target.value, type: 'changeEmail' })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={e => dispatch({ payload: e.target.value, type: 'changePassword' })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="conf-password"
            label="Confirm Password"
            type="password"
            id="conf-password"
            onChange={e => dispatch({ payload: e.target.value, type: 'changeConfPassword' })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstname"
            label="First name"
            name="firstname"
            onChange={e => dispatch({ payload: e.target.value, type: 'changeFirstname' })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastname"
            label="Last name"
            name="lastname"
            onChange={e => dispatch({ payload: e.target.value, type: 'changeLastname' })}
          />
          {isFarmer && (
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="shop"
                label="shop name"
                name="shop"
                onChange={e => dispatch({ payload: e.target.value, type: 'changeShop' })}
              />
              <TextField
                label="Shop description"
                multiline
                rows={4}
                margin="normal"
                required
                fullWidth
                id="shopDescription"
                name="shopDescription"
                onChange={e => dispatch({ payload: e.target.value, type: 'changeShopDescription' })}
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>
          <Grid container>
            <Grid
              item
              xs
            >
              <Link
                href="#auth-forgot-password"
                onClick={e => {
                  e.preventDefault();
                  setAuthView(VIEWS.FORGOTTEN_PASSWORD);
                }}
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#auth-sign-in"
                onClick={e => {
                  e.preventDefault();
                  setAuthView(VIEWS.SIGN_IN);
                }}
                variant="body2"
              >
                {'Sign in'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }

  if (isForgotPassword) {
    return (
      <>
        <Typography
          component="h1"
          variant="h5"
        >
          Enter your email address
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          {messages}
          <TextField
            margin="normal"
            type="email"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={e => dispatch({ payload: e.target.value, type: 'changeEmail' })}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={loading}
            sx={{ mt: 3, mb: 2 }}
          >
            Confirm
          </Button>
          <Grid container>
            <Grid item>
              <Link
                href="#auth-sign-in"
                onClick={e => {
                  e.preventDefault();
                  setAuthView(VIEWS.SIGN_IN);
                }}
                variant="Sign in"
              >
                {'Sign in'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </>
    );
  }
}

export { EmailAuth };
