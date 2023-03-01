import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';

class PaymentForm extends React.Component {
  handleChange = event => {
    this.props.setPaymentData({
      ...this.props.paymentData,
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { setPaymentData, paymentData } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="h6"
          gutterBottom
        >
          Payment method
        </Typography>
        <Grid
          container
          spacing={3}
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
