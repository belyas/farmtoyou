import * as React from 'react';
import { Formik, useFormik } from 'formik';
import { getURL } from '@/utils';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useEffect } from 'react';
import * as Yup from 'yup';

const Add = () => {
  const daysOfWeek = ['select a day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const category = ['Fish', 'Meat', 'Fruits', 'Mashroom', 'Milk Products', 'Vegetables'];
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      delivery_date: '',
      price: '',
      description: '',
      subscription_frequency: '',
      subscription_start: new Date(),
      subscription_end: new Date(),
      photo: null,
      organic: false,
      category: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().max(20, "Title mustn't be more than 20 Characters Long.").required('Title is required:*'),
      price: Yup.number().required('Price is required:*'),
      description: Yup.string().required('description is required:*'),
    }),

    onSubmit: values => {
      setSubmitting(true);
      // Uploading and submitting FIle
      const formData = new FormData();
      formData.append('photo', values.photo);

      console.log(formik.values);
    },
  });

  // Sending Data to Backend
  useEffect(() => {
    const submitData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formik.values),
        });

        if (!response.ok) {
          throw new Error('Failed to submit data');
        }

        // Handle successful submission here
      } catch (error) {
        console.error(error);
        // Handle submission error here
      } finally {
        setSubmitting(false);
      }
    };

    if (submitting) {
      submitData();
    }
  }, [submitting, formik.values]);

  // handle start Subscription change

  const handleSubStartChange = subscription_start => {
    const formattedDate = `${subscription_start.getFullYear()}-${(subscription_start.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${subscription_start.getDate().toString().padStart(2, '0')}`;
    formik.setFieldValue('subscription_start', formattedDate);
  };

  // handle End Subscription change

  const handleSubEndChange = subscription_end => {
    const formattedDate = `${subscription_end.getFullYear()}-${(subscription_end.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${subscription_end.getDate().toString().padStart(2, '0')}`;
    formik.setFieldValue('subscription_end', formattedDate);
  };

  // handle radio change

  const handleRadioChange = event => {
    formik.setFieldValue('organic', event.target.value);
  };

  //handle frequency
  const handleFrequency = event => {
    formik.setFieldValue('subscription_frequency', parseInt(event.target.value));
  };

  return (
    <form
      action="/api/products/add"
      method="post"
      onSubmit={formik.handleSubmit}
    >
      <div>
        <label
          htmlFor="title"
          id="title"
        >
          {formik.touched.title && formik.errors.title ? formik.errors.title : 'Title:'}
        </label>
        <input
          type="text"
          name="title"
          required
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <label htmlFor="description">
          {formik.touched.description && formik.errors.description ? formik.errors.description : 'Description:'}
        </label>
        <input
          type="text"
          name="description"
          required
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <label htmlFor="price">{formik.touched.price && formik.errors.price ? formik.errors.price : 'Price:'}</label>
        <input
          type="number"
          name="price"
          required
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <label htmlFor="delivey_date">Delivery Date:</label>
        <select
          id="dayOfWeek"
          name="dayOfWeek"
          value={formik.values.delivery_date}
          onChange={event => {
            formik.setFieldValue('delivery_date', event.target.value);
          }}
        >
          {daysOfWeek.map(day => (
            <option
              key={day}
              value={day}
            >
              {day}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="subscription_end">Subcription End:</label>
        <input
          type="date"
          name="subscription_end"
          required
          onChange={event => handleSubEndChange(new Date(event.target.value))}
          value={formik.values.subscription_end}
        />
      </div>
      <div>
        <label htmlFor="subscription_start">Subscription Start:</label>
        <input
          type="date"
          name="subscription_start"
          required
          onChange={event => handleSubStartChange(new Date(event.target.value))}
          value={formik.values.subscription_start}
        />
      </div>
      <div>
        <label htmlFor="subscription_frequency">Subscription Frequency</label>
        <select
          id="subscription_frequency"
          name="subscription_frequency"
          value={formik.values.subscription_frequency}
          onChange={handleFrequency}
          onBlur={formik.handleBlur}
        >
          <option value=" ">Select an option</option>
          <option value={1}>Once a week</option>
        </select>
      </div>
      <div>
        <label htmlFor="file">Choose a file:</label>
        <input
          id="photo"
          name="photo"
          type="file"
          onChange={event => {
            formik.setFieldValue('photo', event.currentTarget.files[0]['name']);
          }}
        />
      </div>
      <div>
        <Autocomplete
          multiple
          id="category"
          options={category}
          sx={{ width: 300, margin: 1 }}
          value={formik.values.category}
          onChange={(event, value) => {
            formik.setFieldValue('category', value);
          }}
          renderInput={params => (
            <TextField
              {...params}
              label="category"
              variant="outlined"
              fullWidth
            />
          )}
        />
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="organic"
            value="Yes"
            checked={formik.values.organic === 'Yes'}
            onChange={handleRadioChange}
          />
          Yes
        </label>
      </div>
      <div>
        <label>
          <input
            type="radio"
            name="organic"
            value="No"
            checked={formik.values.organic === 'No'}
            onChange={handleRadioChange}
          />
          No
        </label>
      </div>

      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Add;
