import { useState } from 'react';
import * as React from 'react';
import { Formik, useFormik } from 'formik';
import { getURL } from '@/utils';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useEffect } from 'react';

const Form = () => {
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      delivery_date: new Date(),
      price: '',
      items: '',
      subscription_frequency: '',
      subscription_start: new Date(),
      subscription_end: new Date(),
      photo: null,
      organic: false,
    },
    onSubmit: values => {
      setSubmitting(true);
      // Uploading and submitting FIle
      const formData = new FormData();
      formData.append('photo', values.photo);

      console.log(formik.values);
    },
  });
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

  // handle Delivery Date  change
  const handleDateChange = delivery_date => {
    const formattedDate = `${delivery_date.getFullYear()}-${(delivery_date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${delivery_date.getDate().toString().padStart(2, '0')}`;
    formik.setFieldValue('delivery_date', formattedDate);
  };

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

  const handleFrequency = event => {
    formik.setFieldValue('subscription_frequency', parseInt(event.target.value));
  };

  const handlePrice = event => {
    formik.setFieldValue('price', event.target.value);
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
          Title:
        </label>
        <input
          type="text"
          name="title"
          required
          value={formik.values.title}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label htmlFor="items">Items:</label>
        <input
          type="text"
          name="items"
          required
          value={formik.values.items}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label htmlFor="items">Price:</label>
        <input
          type="number"
          name="price"
          required
          value={formik.values.price}
          onChange={formik.handleChange}
        />
      </div>
      <div>
        <label htmlFor="items">Delivery Date:</label>
        <input
          type="date"
          name="Delivery Date"
          required
          onChange={event => handleDateChange(new Date(event.target.value))}
          value={formik.values.delivery_date}
        />
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
        <option value={2}>Twice a week</option>
      </select>
      {formik.touched.subscription_frequency && formik.errors.subscription_frequency ? (
        <div>{formik.errors.subscription_frequency}</div>
      ) : null}
      <div>
        <label htmlFor="file">Choose a file:</label>
        <input
          id="photo"
          name="photo"
          type="file"
          onChange={event => {
            formik.setFieldValue('photo', event.currentTarget.photo);
          }}
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

export default Form;
