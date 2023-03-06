// import React, { useState } from 'react';
// import { TextField, FormControl, InputLabel, Select, MenuItem, Container } from '@mui/material';

// import countries from 'countries-list';

// function PhoneInput(props) {
//   const [phone, setPhone] = useState('');
//   const [countryCode, setCountryCode] = useState('US');

//   function handlePhoneChange(event) {
//     setPhone(event.target.value);
//   }

//   function handleCountryCodeChange(event) {
//     setCountryCode(event.target.value);
//   }

//   const fullPhone = `+${countries.countries[countryCode].phone}${phone}`;

//   // Create an array of country options for the select field
//   const countryOptions = Object.entries(countries.countries).map(([code, country]) => (
//     <MenuItem
//       key={code}
//       value={code}
//     >
//       {country.name} (+{country.phone})
//     </MenuItem>
//   ));

//   return (
//     <Container sx={{ display: 'flex', justifyContent: 'center' }}>
//       <FormControl>
//         <InputLabel id="country-code-label">Country Code</InputLabel>
//         <Select
//           labelId="country-code-label"
//           id="country-code"
//           value={countryCode}
//           onChange={handleCountryCodeChange}
//           variant="standard"
//         >
//           {countryOptions}
//         </Select>
//       </FormControl>
//       <TextField
//         type="tel"
//         id="phone"
//         name="phone"
//         label="Phone Number"
//         placeholder="Enter your phone number"
//         value={phone}
//         onChange={handlePhoneChange}
//         required
//         variant="standard"
//       />
//     </Container>
//   );
// }

// export default PhoneInput;


// Saving it for Future