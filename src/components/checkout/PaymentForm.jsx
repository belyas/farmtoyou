import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/es/styles-compiled.css';

class PaymentForm extends React.Component {
  handleChange = event => {
    this.props.setPaymentData({
      ...this.props.paymentData,
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { paymentData = {} } = this.props;

    return (
      <React.Fragment>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 24,
            letterSpacing: 0.25,
            color: '#206530',
          }}
        >
          Payment method
        </Typography>
        <Cards
          number={paymentData?.cardNumber ?? ''}
          expiry={paymentData?.expireDate ?? ''}
          cvc={paymentData?.cvv ?? '***'}
          name={paymentData?.cardName ?? ''}
        />
        <Grid
          container
          spacing={3}
          sx={{ mt: 3 }}
        >
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              required
              id="cardName"
              name="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
              value={paymentData.cardName}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              required
              id="cardNumber"
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
              value={paymentData.cardNumber}
              onChange={this.handleChange}
              inputProps={{ maxLength: 16 }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              required
              id="expDate"
              name="expireDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
              value={paymentData.expireDate}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
          >
            <TextField
              required
              id="cvv"
              label="CVV"
              name="cvv"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
              value={paymentData.cvv}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
          ></Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default PaymentForm;
