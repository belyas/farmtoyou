import { Formik, useFormik } from 'formik';
import { useState, useCallback } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import { Box } from '@mui/system';
import Snackbar from '@mui/material/Snackbar';
import moment from 'moment';
import { useDropzone } from 'react-dropzone';

const Add = () => {
  const router = useRouter();
  const daysOfWeek = ['Select the day', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const category = ['Fish', 'Meat', 'Fruits', 'Mashroom', 'Milk Products', 'Vegetables'];
  // For showing error or success messages
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  // add a state to store the binary data of the file
  const [fileData, setFileData] = useState(null);

  // Validating according to mimetypes
  const allowedExtensions = ['.jpg', '.jpeg', '.png'];

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
      price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be greater than zero')
        .required('Price is required'),
      description: Yup.string().required('Description is required'),
      delivery_date: Yup.string()
        .oneOf(daysOfWeek, 'Please select a delivery day')
        .notOneOf(['Select the day'], 'Please select a delivery day')
        .required('Please select a delivery day'),
      subscription_frequency: Yup.string()
        .notOneOf(['Select an option'], 'Please select an option')
        .required('Subscription frequency is required'),
      subscription_start: Yup.date().required('Subscription start date is required'),

      subscription_end: Yup.date()
        .required('Subscription end date is required')
        .test('valid-date', 'Please enter a valid date', value => {
          return moment(value, 'dd/MM/YYYY', true).isValid();
        })
        .required('Subscription end date is required'),
      photo: Yup.mixed().required('Photo is required'),
      organic: Yup.string().oneOf(['Yes', 'No'], 'Please select Yes or No').required('Organic field is required'),
      category: Yup.array().min(1, 'Please select at least one category').required('Category is required'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      // Uploading and submitting FIle
      const formData = new FormData();
      formData.append('photo', fileData);
      try {
        const response = await fetch('http://localhost:3000/api/products/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Failed to submit data');
        }

        // show success message
        setShowSuccess(true);

        // Redirect to /products page after 2 seconds
        setTimeout(() => {
          router.push('/products');
        }, 2000);
      } catch (error) {
        console.error(error);
        // show error message
        setShowError(true);
      }

      console.log(formik.values);

      setSubmitting(false);
    },
  });

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

  //handle frequency
  const handleFrequency = event => {
    formik.setFieldValue('subscription_frequency', parseInt(event.target.value));
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFileData(acceptedFiles[0]);
    },
  });

  return (
    <form
      action="/api/products/add"
      method="post"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <div>
        <label
          htmlFor="title"
          id="title"
        >
          {formik.touched.title && formik.errors.title ? (
            <span style={{ color: 'red' }}>{formik.errors.title}</span>
          ) : (
            'Title:'
          )}
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
          {formik.touched.description && formik.errors.description ? (
            <span style={{ color: 'red' }}>{formik.errors.description} </span>
          ) : (
            'Description:'
          )}
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
        <label htmlFor="price">
          {formik.touched.price && formik.errors.price ? (
            <span style={{ color: 'red' }}>{formik.errors.price} </span>
          ) : (
            'Price:'
          )}
        </label>
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
        <label htmlFor="subscription_start">Subscription Start:</label>
        <input
          type="date"
          name="subscription_start"
          required
          onChange={event => handleSubStartChange(new Date(event.target.value))}
          value={formik.values.subscription_start}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <label htmlFor="subscription_end">
          Subcription End:
          {formik.touched.subscription_end && formik.errors.subscription_end ? (
            <span style={{ color: 'red' }}>{formik.errors.subscription_end}</span>
          ) : (
            ''
          )}
        </label>
        <input
          type="date"
          name="subscription_end"
          required
          onChange={event => handleSubEndChange(new Date(event.target.value))}
          value={formik.values.subscription_end}
          onBlur={formik.handleBlur}
        />
      </div>
      <div>
        <label htmlFor="file">
          Photo:
          {formik.touched.photo && formik.errors.photo && <span style={{ color: 'red' }}>{formik.errors.photo}</span>}
        </label>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {formik.values.photo ? <p>{formik.values.photo.name}</p> : <input type="file" />}
        </div>
      </div>
      <div>
        <label htmlFor="delivey_date">
          Delivery Date:
          {formik.touched.delivery_date && formik.errors.delivery_date ? (
            <span style={{ color: 'red' }}>{formik.errors.delivery_date}</span>
          ) : (
            ''
          )}
        </label>
        <select
          id="dayOfWeek"
          name="dayOfWeek"
          value={formik.values.delivery_date}
          label="Select the Day"
          onChange={event => {
            formik.setFieldValue('delivery_date', event.target.value);
          }}
          onBlur={formik.handleBlur}
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
        <label htmlFor="subscription_frequency">
          Subscription Frequency:
          {formik.touched.subscription_frequency && formik.errors.subscription_frequency ? (
            <span style={{ color: 'red' }}>{formik.errors.subscription_frequency}</span>
          ) : (
            ''
          )}
        </label>
        <select
          id="subscription_frequency"
          name="subscription_frequency"
          value={formik.values.subscription_frequency}
          onChange={handleFrequency}
          onBlur={formik.handleBlur}
        >
          <option value="Select an option">Select an option</option>
          <option value={1}>Once a week</option>
        </select>
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
        {formik.touched.category && formik.errors.category && (
          <div style={{ color: 'red' }}>{formik.errors.category}</div>
        )}
      </div>
      <div>
        <label>Is it organic?</label>
        <div>
          <label>
            <input
              type="radio"
              name="organic"
              value="Yes"
              checked={formik.values.organic === 'Yes'}
              onChange={formik.handleChange}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="organic"
              value="No"
              checked={formik.values.organic === 'No'}
              onChange={formik.handleChange}
            />
            No
          </label>
        </div>
        {formik.touched.organic && formik.errors.organic ? (
          <div style={{ color: 'red' }}>{formik.errors.organic}</div>
        ) : null}
      </div>
      <div>
        <button
          type="submit"
          onClick={() => formik.submitForm()}
        >
          Submit
        </button>
      </div>

      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
      >
        <Alert severity="error">Failed to submit data</Alert>
      </Snackbar>
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">Successfully submitted data</Alert>
      </Snackbar>
    </form>
  );
};

export default Add;
