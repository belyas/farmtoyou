import { useState } from 'react';
import * as React from 'react';
import { Formik, useFormik } from 'formik';
import { getURL } from '@/utils';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useEffect } from 'react';

const Form = () => {
  const [formData, setFormData] = React.useState({});
  const [submitting, setSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      date: new Date(),
      price: '',
      items: '',
      subscriptionfrequency: '',
      startsubscription: new Date(),
      endsubscription: new Date(),
      file: null,
      organic: false,
    },
    onSubmit: values => {
      setSubmitting(true);
      // Uploading and submitting FIle
      const formData = new FormData();
      formData.append('file', values.file);

      setFormData({
        ...formData,
        organic: (values.organic === "Yes").toString(),
      });

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
  const handleDateChange = date => {
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
    formik.setFieldValue('date', formattedDate);
  };

  // handle start Subscription change

  const handleSubStartChange = startsubscription => {
    const formattedDate = `${startsubscription.getFullYear()}-${(startsubscription.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${startsubscription.getDate().toString().padStart(2, '0')}`;
    formik.setFieldValue('startsubscription', formattedDate);
  };

  // handle End Subscription change

  const handleSubEndChange = endsubscription => {
    const formattedDate = `${endsubscription.getFullYear()}-${(endsubscription.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${endsubscription.getDate().toString().padStart(2, '0')}`;
    formik.setFieldValue('endsubscription', formattedDate);
  };

  // handle radio change

  const handleRadioChange = event => {
    formik.setFieldValue('organic', event.target.value);
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
          value={formik.values.date}
        />
      </div>
      <div>
        <label htmlFor="Subscription End">Subcription End:</label>
        <input
          type="date"
          name="Subscription End"
          required
          onChange={event => handleSubEndChange(new Date(event.target.value))}
          value={formik.values.endsubscription}
        />
      </div>
      <div>
        <label htmlFor="Subscription Start">Subscription Start:</label>
        <input
          type="date"
          name="Subscription Start"
          required
          onChange={event => handleSubStartChange(new Date(event.target.value))}
          value={formik.values.startsubscription}
        />
      </div>
      <label htmlFor="subscriptionfrequency">Subscription Frequency</label>
      <select
        id="subscriptionfrequency"
        name="subscriptionfrequency"
        value={formik.values.subscriptionfrequency}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      >
        <option value="">Select an option</option>
        <option value="1">Once a week</option>
        <option value="2">Twice a week</option>
      </select>
      {formik.touched.subscriptionfrequency && formik.errors.subscriptionfrequency ? (
        <div>{formik.errors.subscriptionfrequency}</div>
      ) : null}
      <div>
        <label htmlFor="file">Choose a file:</label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={event => {
            formik.setFieldValue('file', event.currentTarget.files[0]);
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
