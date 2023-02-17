import { useState } from 'react';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Form = () => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredPrice, setEnteredPrice] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  const [enteredItems, setEnteredItems] = useState('');
  const [enteredSubscriptionFrequency, setEnteredSubscriptionFrequency] = useState('');
  const [enteredSubscriptionStart, setEnteredSubscriptionStart] = useState('');
  const [enteredSubscriptionEnd, setEnteredSubscriptionEnd] = useState('');
  const [uploadPhoto, setUploadPhoto] = useState('');
  const [organicValue, setOrganicValue] = useState(1);

  function titleChangeHandler(event) {
    setEnteredTitle(event.target.value);
  }
  function priceHandler(event) {
    setEnteredPrice(event.target.value);
  }
  function dateHandler(event) {
    setEnteredDate(event.target.value);
  }
  function subscriptionHandler(event) {
    setEnteredSubscriptionFrequency(event.target.value);
  }
  function startSubscriptionHandler(event) {
    setEnteredSubscriptionStart(event.target.value);
  }
  function EndSubscriptionHandler(event) {
    setEnteredSubscriptionEnd(event.target.value);
  }
  function PhotoHandler(event) {
    setUploadPhoto(event.target.value);
  }
  function organicHandler(event) {
    setOrganicValue(event.target.value);
  }
  function itemsHandler(event) {
    setEnteredItems(event.target.value);
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    const data = {
      title: enteredTitle,
      date: enteredDate,
      price: enteredPrice,
      items: enteredItems,
      SubscriptionFrequency: enteredSubscriptionFrequency,
      Start_Subscription: enteredSubscriptionStart,
      End_Subscription: enteredSubscriptionEnd,
      Photo: uploadPhoto,
      organic: organicValue,
    };
    console.log(data);
  }
  return (
    <form
      action="/api/products/add"
      method="post"
      onSubmit={formSubmitHandler}
    >
      <div>
        <label
          for="title"
          id="title"
        >
          Title:
        </label>
        <input
          type="text"
          name="title"
          required
          value={enteredTitle}
          onChange={titleChangeHandler}
        />
      </div>
      <div>
        <label for="items">Items:</label>
        <input
          type="text"
          name="items"
          required
          value={enteredItems}
          onChange={itemsHandler}
        />
      </div>
      <div>
        <label for="items">Price:</label>
        <input
          type="number"
          name="price"
          required
          value={enteredPrice}
          onChange={priceHandler}
        />
      </div>
      <div>
        <label for="items">Delivery Date:</label>
        <input
          type="date"
          name="Delivery Date"
          required
          value={enteredDate}
          onChange={dateHandler}
        />
      </div>
      <div>
        <label for="Subscription Frequency">Subcription End:</label>
        <input
          type="date"
          name="Subscription Frequency"
          required
          value={enteredSubscriptionEnd}
          onChange={EndSubscriptionHandler}
        />
      </div>
      <div>
        <label for="Subscription Start">Subscription Start:</label>
        <input
          type="date"
          name="Subscription Start"
          required
          value={enteredSubscriptionStart}
          onChange={startSubscriptionHandler}
        />
      </div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <label> Subscription Frequency:</label>
          <InputLabel
            id="demo-simple-select-label"
            for="Subscription End"
            type="date"
            name="Subscription End"
            required
          ></InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={enteredSubscriptionFrequency}
            label="Frequency"
            onChange={subscriptionHandler}
          >
            <MenuItem value={1}>Once a week</MenuItem>
            <MenuItem value={2}>Twice a week</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <div>
        <label for="Photo">Photo:</label>
        <input
          type="file"
          name="img"
          id="image-input"
          required
          value={uploadPhoto}
          onChange={PhotoHandler}
        />
      </div>
      <div>
        <label for="Organic">Organic:</label>
        <input
          type="radio"
          id="Yes-organic"
          name="radioChecker"
          value="1"
          onChange={organicHandler}
          checked={organicValue == 1 ? true : false}
        />
        <label>Yes</label>
        <input
          type="radio"
          name="radioChecker"
          value="2"
          onChange={organicHandler}
          checked={organicValue == 2 ? true : false}
        ></input>
        <label>No</label>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default Form;
