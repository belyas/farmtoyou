import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';

class Review extends React.Component {
  render() {
    const { paymentData = { cardNumber: 'xxxx' }, cart = {}, addressData = {} } = this.props;
    const formattedPayments = [
      { name: 'Card holder', detail: paymentData?.cardName },
      { name: 'Card number', detail: `xxxx-xxxx-xxxx-${paymentData.cardNumber.slice(-4)}` },
      { name: 'Expiry date', detail: paymentData?.expireDate },
    ];
    // Total Amount
    const total = cart?.cart?.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
      <React.Fragment>
        <Box>
          <Typography
            variant="h6"
            gutterBottom
            sx={{
              mt: 2,
              fontFamily: 'Inter',
              fontStyle: 'normal',
              fontWeight: 500,
              fontSize: 28,
              letterSpacing: 0.25,
              color: '#206530',
              display: 'flex',
              alignContent: 'flex-start',
            }}
          >
            Order summary
          </Typography>
          <List disablePadding>
            {cart?.cart &&
              cart.cart.map(product => (
                <ListItem
                  key={product.id}
                  sx={{ py: 1, px: 0 }}
                >
                  <ListItemText
                    primary={product.title}
                    secondary={`Quantity: ${product.quantity}`}
                  />
                  <Typography variant="body2">${product.price * product.quantity}</Typography>
                </ListItem>
              ))}
            <ListItem sx={{ py: 1, px: 0, borderBottom: '1px solid #bdbdbd' }}>
              <ListItemText primary="Total" />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, mb: 2 }}
              >
                ${total}
              </Typography>
            </ListItem>
          </List>
          <Grid
            container
            spacing={2}
            sx={{ display: 'flex', flexDirection: 'column' }}
          >
            <Grid
              item
              container
              direction="column"
              xs={12}
              sm={6}
              sx={{ borderBottom: '1px solid #bdbdbd', display: 'flex', alignContent: 'center' }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  mt: 2,
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: 27,
                  letterSpacing: 0.25,
                  color: '#206530',
                }}
              >
                Shipping Address
              </Typography>
              <Typography gutterBottom>{`${addressData.firstName} ${addressData.lastName}`}</Typography>
              <Typography gutterBottom>{addressData.address1}</Typography>
              <Typography gutterBottom>{addressData.address2}</Typography>
              <Typography gutterBottom>{addressData.city}</Typography>
              <Typography gutterBottom>{addressData.country}</Typography>
              <Typography gutterBottom>{addressData.code_postal}</Typography>
              <Typography gutterBottom>{addressData.phone}</Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              sm={6}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  mt: 2,
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: 27,
                  letterSpacing: 0.25,
                  color: '#206530',
                }}
              >
                Payment details
              </Typography>
              <Grid
                container
                sx={{
                  mt: 2,
                  fontFamily: 'Inter',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: 24,
                  letterSpacing: 0.25,
                  color: '#206530',
                }}
              >
                {Array.isArray(formattedPayments) &&
                  formattedPayments.map(payment => (
                    <React.Fragment key={payment.name}>
                      <Grid
                        item
                        xs={6}
                      >
                        <Typography gutterBottom>{payment.name}</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={6}
                      >
                        <Typography gutterBottom>{payment.detail}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }
}

export default Review;
