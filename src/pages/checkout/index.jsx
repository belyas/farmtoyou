import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '@/components/checkout/AddressForm';
import PaymentForm from '@/components/checkout/PaymentForm';
import Review from '@/components/checkout/Review';
import * as Yup from 'yup';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import { useState, useContext } from 'react';
import { getURL } from '@/utils';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { CartContext } from '@/components/cart/cartContext';
import { useUser } from '@supabase/auth-helpers-react';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  // try {
  //   let { error, data } = await supabase.from('farmer').select('id').eq('profile_id', session.user.id);

  //   if (error) {
  //     throw typeof error === 'string' ? new Error(error) : error;
  //   }

  //   return { props: { data, initialSession: session } };
  // } catch (error) {
  //   return { props: { data: 'Internal Server Error.', error: error.message, initialSession: session } };
  // }

  let paymentResult = await supabase.from('payments_cencored').select('*').eq('profile_id', session.user.id).single();
  let addressResult = await supabase.from('addresses').select('*').eq('profile_id', session.user.id).single();

  return {
    props: {
      savedPayment: paymentResult.data,
      savedAddress: addressResult.data,
    },
  };
}

export default function Checkout({ savedAddress, savedPayment }) {
  const steps = ['Shipping address', 'Payment details', 'Review your order'];

  function GetStepContent(step, cart, { setAddressData, addressData, paymentData, setPaymentData }) {
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
        return (
          <Review
            paymentData={paymentData}
            cart={cart}
            addressData={addressData}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  const theme = createTheme();

  const initialAddressState = {
    firstName: savedAddress?.firstname || '',
    lastName: savedAddress?.lastname || '',
    address1: savedAddress?.address_1 || '',
    address2: savedAddress?.address_2 || '',
    city: savedAddress?.city || '',
    province: savedAddress?.province || '',
    code_postal: savedAddress?.code_postal || '',
    country: savedAddress?.country || '',
    phone: savedAddress?.phone || '',
  };

  const initialPaymentState = {
    cardName: savedPayment?.card_holder || '',
    cardNumber: savedPayment ? `${'*'.repeat(12)}${savedPayment?.card_number}` : '',
    expireDate: savedPayment?.expiration_date || '',
    cvv: '',
    focus: false,
  };

  const user = useUser();
  const { cart } = useContext(CartContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [addressData, setAddressData] = React.useState(initialAddressState);
  const [paymentData, setPaymentData] = React.useState(initialPaymentState);
  // For showing error or success messages
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorPaymentMessage, setErrorPaymentMessage] = useState(false);
  const [successPaymentMessage, setSuccessPaymentMessage] = useState(false);

  const handleNext = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear().toString().substr(-2);
    const currentMonth = currentDate.getMonth() + 1;

    // Address Validation
    const addressValidationSchema = Yup.object().shape({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      address1: Yup.string().required('Address line 1 is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      code_postal: Yup.string().required('Postal/Zip code is required'),
      province: Yup.string().required('Province is required'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number'),
    });

    // Payment Validation

    const paymentSchema = Yup.object().shape({
      cardName: Yup.string().required('Cardholder name is required'),
      cardNumber: Yup.string()
        .required('Card number is required')
        .matches(/^\d{16}$/, 'Card number must be 16 digits'),
      expireDate: Yup.string()
        .required('Expiration date is required')
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiration date must be in the format MM/YY')
        .test('future-date', 'Expiration date must be in the future', function (value) {
          if (!value) return false;
          const [month, year] = value.split('/');
          return (
            parseInt(year) > parseInt(currentYear) ||
            (parseInt(year) === parseInt(currentYear) && parseInt(month) >= currentMonth)
          );
        }),
      cvv: Yup.string()
        .required('CVV is required')
        .matches(/^\d{3}$/, 'CVV must be 3 digits'),
    });

    if (activeStep === 0) {
      addressValidationSchema
        .validate(addressData, { abortEarly: false })
        .then(success => {
          setSuccessMessage(success);
          setActiveStep(activeStep + 1);
        })
        .catch(error => {
          const errorrMessage = error.errors.join('\n');
          setErrorMessage(true);
        });
    } else if (activeStep === 1) {
      paymentSchema
        .validate(paymentData, { abortEarly: false })
        .then(() => {
          setSuccessPaymentMessage(true);
          setActiveStep(activeStep + 1);
        })
        .catch(error => {
          const errorrMessage = error.errors ? error.errors.join('\n') : 'Unknown error';
          setErrorPaymentMessage(true);
        });
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const profile_id = user.id;
    const products = cart.cart;
    const orders = {};
    for (const product of products) {
      const farmer_id = product.farmer_id;
      const products = orders[farmer_id] ? orders[farmer_id].products : [];
      orders[farmer_id] = {
        products: products,
        profile_id: profile_id,
        total_amount: orders[farmer_id]?.total_amount
          ? orders[farmer_id].total_amount + product.price * product.quantity
          : product.price * product.quantity,
      };
      orders[farmer_id].products.push(product);
    }

    try {
      // Submit orders data to orders API
      const ordersResponse = await fetch(`${getURL()}api/checkout/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders }),
      });

      // Check the response status of the orders API call
      if (!ordersResponse.ok) {
        setShowError(true);
        throw new Error('Error submitting orders data');
      }
      //construct addressdata in the format api accepts
      console.log('addresss data from form', addressData);
      const address = {
        firstname: addressData.firstName,
        lastname: addressData.lastName,
        address_1: addressData.address1,
        address_2: addressData.address2,
        city: addressData.city,
        province: addressData.province,
        country: addressData.country,
        phone: addressData.phone,
        code_postal: addressData.code_postal,
        profile_id: profile_id,
      };

      //construct paymentData in the format api accepts
      console.log('payment data from form', paymentData);
      const payment = {
        card_holder: paymentData.cardName,
        card_number: paymentData.cardNumber,
        card_cvv: paymentData.cvv,
        expiration_date: paymentData.expireDate,
        profile_id: profile_id,
      };
      // Submit payment data to payment API
      //if has saved payment, use "put" method
      if (savedPayment) {
        const paymentResponse = await fetch(`${getURL()}api/checkout/payment`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });
        // Check the response status of the payment API call
        if (!paymentResponse.ok) {
          setShowError(true);
          throw new Error('Error submitting payment data');
        }
      } else {
        //use post method
        const paymentResponse = await fetch(`${getURL()}api/checkout/payment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payment),
        });
        if (!paymentResponse.ok) {
          setShowError(true);
          throw new Error('Error submitting payment data');
        }
      }

      // Submit address data to address API
      //if has saved address, update it with "put" method
      if (savedAddress) {
        const addressResponse = await fetch(`${getURL()}api/checkout/address`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(address),
        });

        // Check the response status of the address API call
        if (!addressResponse.ok) {
          setShowError(true);
          throw new Error('Error submitting address data');
        }
      } else {
        const addressResponse = await fetch(`${getURL()}api/checkout/address`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(address),
        });

        // Check the response status of the address API call
        if (!addressResponse.ok) {
          setShowError(true);
          throw new Error('Error submitting address data');
        }
      }

      // Remove cart data from local storage
      localStorage.removeItem('cart');
      //Remove Cart from cart
      cart.clear();

      // Both API calls were successful, update the active step
      setShowSuccess(true);
      setActiveStep(activeStep + 1);
    } catch (error) {
      // Show error message
      setShowError(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Something went wrong...</Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Order placed!</Alert>
      </Snackbar>

      <Snackbar
        open={errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Add Required Fields* (Phone contains 10 to 13 digits)</Alert>
      </Snackbar>
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Next</Alert>
      </Snackbar>

      <Snackbar
        open={errorPaymentMessage}
        autoHideDuration={3000}
        onClose={() => setErrorPaymentMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Add Required Fields* (card:16 digits && ExpDate: MM/YY && Cvv: 3 digits)</Alert>
      </Snackbar>
      <Snackbar
        open={successPaymentMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessPaymentMessage(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success">Next</Alert>
      </Snackbar>
      <Container
        component="main"
        maxWidth="md"
        sx={{ mb: 4 }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, background: '#F0FDF0' }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            sx={{
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 34,
              letterSpacing: 0.25,
              color: '#263238',
            }}
          >
            Checkout
          </Typography>
          <Stepper
            activeStep={activeStep}
            sx={{ pt: 3, pb: 5 }}
          >
            {steps.map(label => (
              <Step key={label}>
                <StepLabel> {label}</StepLabel>
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
              <Link
                href="/"
                style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}
              >
                {' '}
                <Button variant="contained">Continue Shopping </Button>
              </Link>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {GetStepContent(activeStep, cart, { setAddressData, addressData, paymentData, setPaymentData })}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{ mt: 3, ml: 1, color: '#206530' }}
                  >
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                  sx={{ mt: 3, ml: 1, backgroundColor: '#206530' }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
