import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import * as Yup from 'yup';

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
    >
      {'Copyright © '}
      <Link
        color="inherit"
        href="https://mui.com/"
      >
        FarmToYou
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step, { setAddressData, addressData, paymentData, setPaymentData }) {
  switch (step) {
    case 0:
      return (
        <AddressForm
          setAddressData={setAddressData}
          addressData={addressData}
        />
      );
    case 1:
      return (
        <PaymentForm
          setPaymentData={setPaymentData}
          paymentData={paymentData}
        />
      );
    case 2:
      return <Review paymentData={paymentData} />;
    default:
      throw new Error('Unknown step');
  }
}

const theme = createTheme();

const initialAddressState = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  province: '',
  code_postal: '',
  country: '',
};

const initialPaymentState = {
  cardName: '',
  cardNumber: '',
  expireDate: '',
  cvv: '',
};

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressData, setAddressData] = React.useState(initialAddressState);
  const [paymentData, setPaymentData] = React.useState(initialPaymentState);

  const handleNext = () => {
    // Address Validation
    const addressValidationSchema = Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      address1: Yup.string().required('Address line 1 is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      code_postal: Yup.string().required('Postal/Zip code is required'),
    });

    // Payment Validation

    const paymentSchema = Yup.object().shape({
      cardName: Yup.string().required('Cardholder name is required'),
      cardNumber: Yup.string()
        .required('Card number is required')
        .matches(/^\d{16}$/, 'Card number must be 16 digits'),
      expireDate: Yup.string()
        .required('Expiration date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be in the format MM/YY'),
      cvv: Yup.string()
        .required('CVV is required')
        .matches(/^\d{3}$/, 'CVV must be 3 digits'),
    });

    if (activeStep === 0) {
      addressValidationSchema
        .validate(addressData, { abortEarly: false })
        .then(() => {
          setActiveStep(activeStep + 1);
        })
        .catch(error => {
          const errorMessage = error.errors.join('\n');
          console.log(errorMessage);
          alert(errorMessage);
        });
    } else if (activeStep === 1) {
      paymentSchema
        .validate(paymentData, { abortEarly: false })
        .then(() => {
          setActiveStep(activeStep + 1);
        })
        .catch(error => {
          const errorMessage = error.errors.join('\n');
          console.log(errorMessage);
          alert(errorMessage);
        });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(addressData);
    console.log(paymentData);
    setActiveStep(activeStep + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: t => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
          >
            <Link
              color="inherit"
              href="https://www.google.com"
            >
              Farm to you
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        component="main"
        maxWidth="sm"
        sx={{ mb: 4 }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
          >
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography
                variant="h5"
                gutterBottom
              >
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order confirmation, and will send you an update when
                your order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, { setAddressData, addressData, paymentData, setPaymentData })}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}
