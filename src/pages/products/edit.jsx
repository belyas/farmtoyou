import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useFormik } from 'formik';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { getURL } from '@/utils';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const {
    query: { id },
  } = ctx;

  try {
    let { error, data } = await supabase.from('products').select('*').eq('id', id).single();

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    let { error: farmerError, data: farmers } = await supabase.from('farmers').select('id');

    if (farmerError) {
      throw typeof farmerError === 'string' ? new Error(farmerError) : farmerError;
    }

    return { props: { data, farmers, initialSession: session } };
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error, initialSession: session } };
  }
}

const Edit = ({ data, farmers }) => {
  const router = useRouter();
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const category = ['Fish', 'Meat', 'Fruits', 'Mashroom', 'Milk Products', 'Vegetables'];
  const daysOfWeekFromBackend = daysOfWeek.map(day => day.toLowerCase());
  // For showing error or success messages
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: data.title,
      delivery_date: data.delivery_date,
      price: data.price,
      description: data.description,
      subscription_frequency: data.subscription_frequency,
      subscription_start: data.subscription_start,
      subscription_end: data.subscription_end,
      photo: undefined,
      oldphoto: data.photo,
      organic: data.organic ? 'Yes' : 'No',
      category: data.category,
      farmer_id: data.farmer_id,
      quantity: data.quantity,
      delivery_method: data.delivery_method,
      id: data.id,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(20, "Title mustn't be more than 20 Characters Long.").required('Title is required:*'),
      price: Yup.number()
        .typeError('Price must be a number')
        .positive('Price must be greater than zero')
        .required('Price is required'),
      description: Yup.string().required('Description is required'),
      delivery_date: Yup.string()
        .oneOf([...daysOfWeekFromBackend, ...daysOfWeek], 'Please select a delivery day')
        .notOneOf(['Select the day'], 'Please select a delivery day')
        .required('Please select a delivery day'),
      subscription_frequency: Yup.number()
        .required('Subscription Frequency is required')
        .notOneOf(['Select an option'], 'Please select an option*'),
      subscription_start: Yup.date()
        .required('Subscription start date is required*')
        .test('valid-date', 'Please enter a valid date', value => {
          const date = new Date(value);
          return !isNaN(date) && date >= new Date();
        }),
      subscription_end: Yup.date()
        .required('Subscription end date is required*')
        .test('valid-date', 'Please enter a valid date', value => {
          const date = new Date(value);
          return !isNaN(date) && date >= new Date();
        }),
      photo: Yup.mixed(),
      organic: Yup.string().oneOf(['Yes', 'No'], 'Please select Yes or No').required('Organic field is required*'),
      category: Yup.array().min(1, 'Please select at least one category*').required('Category is required*'),
      delivery_method: Yup.string().required('Please select delivery method* '),
      quantity: Yup.number()
        .typeError('Quantity must be a number')
        .positive('Quantity must be greater than zero')
        .required('Quantity is required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('photo', values.photo);
      formData.append('delivery_date', values.delivery_date);
      formData.append('subscription_end', values.subscription_end);
      formData.append('subscription_start', values.subscription_start);
      formData.append('subscription_frequency', values.subscription_frequency);
      formData.append('category', values.category);
      formData.append('organic', values.organic === 'Yes');
      formData.append('farmer_id', values.farmer_id);
      formData.append('quantity', values.quantity);
      formData.append('delivery_method', values.delivery_method);
      formData.append('id', values.id);

      // Uploading and submitting FIle
      try {
        const response = await fetch(`${getURL()}api/products`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to submit data');
        }

        // show success message
        setShowSuccess(true);

        // Redirect to /products page
        setTimeout(() => {
          router.push('/products');
        }, 500);
      } catch (error) {
        // show error message
        setShowError(true);
      }
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
  const handleDeliveryMethod = event => {
    formik.setFieldValue('delivery_method', parseInt(event.target.value));
  };

  //handle photo change
  const handlePhotoChange = event => {
    const file = event.target.files[0];

    formik.setFieldValue('photo', file);
  };

  return (
    <form
      action="/api/products/update"
      method="PUT"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      noValidate
    >
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
      <div>
        <label
          htmlFor="title"
          id="title"
        >
          Title:{' '}
          {formik.touched.title && formik.errors.title ? (
            <span style={{ color: 'red' }}>{formik.errors.title}</span>
          ) : (
            ''
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
          Description:{' '}
          {formik.touched.description && formik.errors.description ? (
            <span style={{ color: 'red' }}>{formik.errors.description} </span>
          ) : (
            ''
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
          Price:{' '}
          {formik.touched.price && formik.errors.price ? (
            <span style={{ color: 'red' }}>{formik.errors.price} </span>
          ) : (
            ''
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
        <label htmlFor="quantity">
          Quantity:{' '}
          {formik.touched.quantity && formik.errors.quantity ? (
            <span style={{ color: 'red' }}>{formik.errors.quantity} </span>
          ) : (
            ''
          )}
        </label>
        <input
          type="number"
          name="quantity"
          required
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      <div>
        <label htmlFor="subscription_start">
          Subscription Start:{' '}
          {formik.touched.subscription_start && formik.errors.subscription_start ? (
            <span style={{ color: 'red' }}>{formik.errors.subscription_start}</span>
          ) : (
            ''
          )}
        </label>
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
        <input
          type="file"
          name="photo"
          onBlur={formik.handleBlur}
          onChange={handlePhotoChange}
        />
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
          value={formik.values.delivery_date.charAt(0).toUpperCase() + formik.values.delivery_date.slice(1)}
          label="Select the Day"
          onBlur={formik.handleBlur}
          onChange={event => {
            formik.setFieldValue('delivery_date', event.target.value);
          }}
        >
          {' '}
          <option
            value=""
            disabled
          >
            Select the day
          </option>
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
        <label htmlFor="delivery_method">
          Delivery method:
          {formik.touched.delivery_method && formik.errors.delivery_method ? (
            <span style={{ color: 'red' }}>{formik.errors.delivery_method}</span>
          ) : (
            ''
          )}
        </label>
        <select
          id="delivery_method"
          name="delivery_method"
          value={formik.values.delivery_method}
          onChange={handleDeliveryMethod}
          onBlur={formik.handleBlur}
        >
          <option
            value=""
            disabled
          >
            Select an option
          </option>
          <option value={1}>Farmer delivery</option>
          <option value={2}>Pick up place</option>
        </select>
      </div>

      <div>
        {formik.touched.category && formik.errors.category && (
          <div style={{ color: 'red' }}>{formik.errors.category}</div>
        )}
        <Autocomplete
          multiple
          id="category"
          options={category}
          sx={{ width: 300, margin: 1 }}
          value={formik.values.category}
          onBlur={formik.handleBlur}
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
        <label>Is it organic?</label>
        <div>
          <label>
            <input
              type="radio"
              name="organic"
              value="Yes"
              checked={formik.values.organic === 'Yes'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default Edit;
