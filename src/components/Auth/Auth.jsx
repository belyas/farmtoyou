import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { VIEWS } from './constants';
import {
  EmailAuth,
  ForgottenPassword,
  // UpdatePassword,
} from './Steps';
// import { UserContextProvider, useUser } from './UserContext'
const UpdatePassword = () => {};

function Auth({ supabaseClient, view = 'sign_in', redirectTo, showLinks = true }) {
  const [authView, setAuthView] = useState(view);
  const [defaultEmail, setDefaultEmail] = useState('');
  const [defaultPassword, setDefaultPassword] = useState('');

  useEffect(() => {
    setAuthView(view);
  }, [view]);

  const emailProp = {
    supabaseClient,
    setAuthView,
    defaultEmail,
    defaultPassword,
    setDefaultEmail,
    setDefaultPassword,
    redirectTo,
    showLinks,
  };

  /**
   * View handler, displays the correct Auth view
   * all views are wrapped in <Container/>
   */
  switch (authView) {
    case VIEWS.SIGN_IN:
      return (
        <Container maxWidth="sm">
          <EmailAuth
            {...emailProp}
            authView={'sign_in'}
          />
        </Container>
      );
    case VIEWS.SIGN_UP:
      return (
        <Container maxWidth="sm">
          <EmailAuth
            supabaseClient={supabaseClient}
            authView={VIEWS.SIGN_UP}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            showLinks={showLinks}
          />
        </Container>
      );
    case VIEWS.FORGOTTEN_PASSWORD:
      return (
        <Container maxWidth="sm">
          <ForgottenPassword
            supabaseClient={supabaseClient}
            setAuthView={setAuthView}
            redirectTo={redirectTo}
            showLinks={showLinks}
          />
        </Container>
      );
    // case VIEWS.UPDATE_PASSWORD:
    //   return (
    //     <Container>
    //       <UpdatePassword supabaseClient={supabaseClient} />
    //     </Container>
    //   )
    default:
      return null;
  }
}

Auth.ForgottenPassword = ForgottenPassword;
// Auth.UpdatePassword = UpdatePassword
// Auth.UserContextProvider = UserContextProvider
// Auth.useUser = useUser

export default Auth;
