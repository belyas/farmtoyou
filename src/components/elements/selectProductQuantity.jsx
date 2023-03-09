import { Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';

const SelectProductQuantity = ({ stock, setQuantity, quantity }) => {
  const maxQuantity = stock < 10 ? stock : 10;

  const quantityOptions = [...Array(maxQuantity).keys()].map(n => n + 1);

  const handleChange = event => {
    setQuantity(event.target.value);
  };

  return (
    <FormControl
      sx={{ m: 1, minWidth: 120 }}
      size="small"
    >
      <InputLabel id="product-amount-select-label">Quantity</InputLabel>
      <Select
        labelId="product-quantity-select-label"
        id="product-quantity-select"
        value={quantity}
        label="quantity"
        onChange={handleChange}
      >
        {quantityOptions.map((num, index) => {
          return (
            <MenuItem
              key={index}
              value={num}
            >
              {num}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectProductQuantity;
