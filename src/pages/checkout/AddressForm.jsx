import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

class AddressForm extends React.Component {

  handleChange = event => {
    this.props.setAddressData({
      ...this.props.addressData,
      [event.target.name]: event.target.value,
    });
  };

  
  render() {
    const { setAddressData, addressData } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="h6"
          gutterBottom
        >
          Shipping address
        </Typography>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First name"
              fullWidth
              autoComplete="given-name"
              variant="standard"
              value={addressData.firstName}
              onChange={this.handleChange}
              
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last name"
              fullWidth
              autoComplete="family-name"
              variant="standard"
              onChange={this.handleChange}
              value={addressData.lastName}
             
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              required
              id="address1"
              name="address1"
              label="Address line 1"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              value={addressData.address1}
              onChange={this.handleChange}
          
            />
          </Grid>
          <Grid
            item
            xs={12}
          >
            <TextField
              id="address2"
              name="address2"
              label="Address line 2"
              fullWidth
              autoComplete="shipping address-line2"
              variant="standard"
              value={addressData.address2}
              onChange={this.handleChange}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              required
              id="city"
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
              value={addressData.city}
              onChange={this.handleChange}
              
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              id="province"
              name="province"
              label="State/Province/Region"
              fullWidth
              variant="standard"
             
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              required
              id="code_postal"
              name="code_postal"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              value={addressData.code_postal}
              onChange={this.handleChange}
             
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
          >
            <TextField
              required
              id="country"
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
              variant="standard"
              value={addressData.country}
              onChange={this.handleChange}

     
            />
          </Grid>
          {/* <Grid item xs={12}>
          <PhoneInput />
        </Grid> */}
        </Grid>
      </React.Fragment>
    );
  }
}

export default AddressForm;
