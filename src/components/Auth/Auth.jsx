import React, { useEffect, useState } from 'react';
import { VIEWS } from './constants';
import { EmailAuth, ForgottenPassword, MagicLink, UpdatePassword } from './Steps';
// import { UserContextProvider, useUser } from './UserContext'

const Container = ({ children }) => <div className="auth-container">{children}</div>;

function Auth({ supabaseClient, view = 'sign_in', redirectTo, magicLink = false, showLinks = true }) {
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
    magicLink,
    showLinks,
    i18n,
    appearance,
  };

  /**
   * View handler, displays the correct Auth view
   * all views are wrapped in <Container/>
   */
  switch (authView) {
    case VIEWS.SIGN_IN:
      return (
        <Container>
          <EmailAuth
            {...emailProp}
            authView={'sign_in'}
          />
        </Container>
      );
    case VIEWS.SIGN_UP:
      return (
        <Container>
          <EmailAuth
            supabaseClient={supabaseClient}
            authView={'sign_up'}
            setAuthView={setAuthView}
            defaultEmail={defaultEmail}
            defaultPassword={defaultPassword}
            setDefaultEmail={setDefaultEmail}
            setDefaultPassword={setDefaultPassword}
            redirectTo={redirectTo}
            magicLink={magicLink}
            showLinks={showLinks}
          />
        </Container>
      );
    // case VIEWS.FORGOTTEN_PASSWORD:
    //   return (
    //     <Container>
    //       <ForgottenPassword
    //         supabaseClient={supabaseClient}
    //         setAuthView={setAuthView}
    //         redirectTo={redirectTo}
    //         showLinks={showLinks}
    //       />
    //     </Container>
    //   )

    // case VIEWS.MAGIC_LINK:
    //   return (
    //     <Container>
    //       <MagicLink
    //         appearance={appearance}
    //         supabaseClient={supabaseClient}
    //         setAuthView={setAuthView}
    //         redirectTo={redirectTo}
    //         showLinks={showLinks}
    //         i18n={i18n}
    //       />
    //     </Container>
    //   )
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

export default Auth;
