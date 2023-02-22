import { Typography, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';

const SelectProductQuantity = () => {
  const [quantity, SetQuantity] = useState(0);

  const handleChange = event => {
    SetQuantity(event.target.value);
  };
  //todo select option shall not exceed the quantity of a given product
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="product-amount-select-label">Quantity</InputLabel>
      <Select
        labelId="product-quantity-select-label"
        id="product-quantity-select"
        value={quantity}
        label="quantity"
        onChange={handleChange}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem>
        <MenuItem value={8}>8</MenuItem>
        <MenuItem value={9}>9</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SelectProductQuantity;
