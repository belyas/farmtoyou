import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Button, MenuItem, Select, InputLabel, TextField, Radio, Typography, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { getURL } from '@/utils';
import styles from '@/styles/edit.module.css';

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
  const category = [
    'Bakery',
    'Meat',
    'Dairy',
    'Fruits',
    'Vegetables',
    'Flour',
    'Rice and pasta',
    'Oil',
    'Coffee and tea',
    'Wine and beer',
    'Salt and spices',
    'Seeds',
    'Beans and Legumes',
  ];
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
      photo: null,
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

      subscription_end: Yup.date()
        .required('Subscription end date is required*')
        .test('valid-date', 'Please enter a valid date', value => {
          const date = new Date(value);
          return !isNaN(date) && date >= new Date();
        }),
      // photo: Yup.mixed(),
      organic: Yup.string().oneOf(['Yes', 'No'], 'Please select Yes or No').required('Organic field is required*'),
      category: Yup.array().min(1, 'Please select at least one category*').required('Category is required*'),
      delivery_method: Yup.string().required('Please select delivery method* '),
      quantity: Yup.number()
        .typeError('Quantity must be a number')
        .positive('Quantity must be greater than zero')
        .required('Quantity is required'),

      //only validate photo size if photo is provided
      // photo: Yup.optional().when(value => {
      //   if (value) {
      //     return Yup.mixed().test('photo-size', 'Photo exceeds 1 MB limit', value => value.size < 1048576);
      //   } else {
      //     Yup.mixed().notRequired();
      //   }
      // }),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('price', values.price);
      formData.append('description', values.description);
      formData.append('photo', values.photo);
      formData.append('oldphoto', values.oldphoto);
      formData.append('delivery_date', values.delivery_date);
      formData.append('subscription_end', values.subscription_end);
      formData.append('subscription_frequency', values.subscription_frequency);
      formData.append('category', values.category);
      formData.append('organic', values.organic === 'Yes');
      formData.append('farmer_id', values.farmer_id);
      formData.append('quantity', values.quantity);
      formData.append('delivery_method', values.delivery_method);
      formData.append('id', values.id);

      // Uploading and submitting FIle
      try {
        const response = await fetch(`${getURL()}api/products/update`, {
          method: 'PUT',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to submit data');
        }
        const updateProduct = async dataToUpdateProduct => {
          // Create a new FormData object
          const formData = new FormData();

          // Add all fields except the photo to the FormData object
          for (const key in dataToUpdateProduct) {
            if (key !== 'photo') {
              formData.append(key, dataToUpdateProduct[key]);
            }
          }

          // Append the photo to the FormData object
          formData.append('photo', dataToUpdateProduct.photo, dataToUpdateProduct.photo.name);

          try {
            const response = await fetch(`${getURL()}api/products/update`, {
              method: 'PUT',
              body: formData,
            });
            const data = await response.json();
            return data;
          } catch (_) {}
        };

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
    console.log(file);

    formik.setFieldValue('photo', file);
  };

  return (
    <form
      action="/api/products/update"
      method="PUT"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      noValidate
      className={styles.formGrid}
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
      <Grid>
        <Grid>
          <InputLabel
            htmlFor="title"
            id="title"
            className={styles.label}
          >
            Title:{' '}
            {formik.touched.title && formik.errors.title ? (
              <span style={{ color: 'red' }}>{formik.errors.title}</span>
            ) : (
              ''
            )}
          </InputLabel>
          <input
            type="text"
            name="title"
            required
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
        </Grid>
        <Grid>
          <InputLabel
            htmlFor="description"
            className={styles.label}
          >
            Description:{' '}
            {formik.touched.description && formik.errors.description ? (
              <span style={{ color: 'red' }}>{formik.errors.description} </span>
            ) : (
              ''
            )}
          </InputLabel>
          <input
            type="text"
            name="description"
            required
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
        </Grid>
        <Grid>
          <InputLabel
            htmlFor="price"
            className={styles.label}
          >
            Price:{' '}
            {formik.touched.price && formik.errors.price ? (
              <span style={{ color: 'red' }}>{formik.errors.price} </span>
            ) : (
              ''
            )}
          </InputLabel>
          <input
            type="number"
            name="price"
            required
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
        </Grid>
        <Grid>
          <InputLabel
            htmlFor="quantity"
            className={styles.label}
          >
            Quantity:{' '}
            {formik.touched.quantity && formik.errors.quantity ? (
              <span style={{ color: 'red' }}>{formik.errors.quantity} </span>
            ) : (
              ''
            )}
          </InputLabel>
          <input
            type="number"
            name="quantity"
            required
            value={formik.values.quantity}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
        </Grid>

        <Grid>
          <InputLabel
            htmlFor="subscription_end"
            className={styles.label}
          >
            Subcription End:
            {formik.touched.subscription_end && formik.errors.subscription_end ? (
              <span style={{ color: 'red' }}>{formik.errors.subscription_end}</span>
            ) : (
              ''
            )}
          </InputLabel>
          <input
            type="date"
            name="subscription_end"
            required
            onChange={event => handleSubEndChange(new Date(event.target.value))}
            value={formik.values.subscription_end}
            onBlur={formik.handleBlur}
            className={styles.input}
          />
        </Grid>
        <Grid>
          <InputLabel
            htmlFor="file"
            className={styles.label}
          >
            Photo:
            {formik.touched.photo && formik.errors.photo && <span style={{ color: 'red' }}>{formik.errors.photo}</span>}
          </InputLabel>
          <input
            type="file"
            name="photo"
            onBlur={formik.handleBlur}
            onChange={handlePhotoChange}
            className={styles.input}
          />
        </Grid>
        <Grid>
          <InputLabel
            htmlFor="delivey_date"
            className={styles.label}
          >
            Delivery Date:
            {formik.touched.delivery_date && formik.errors.delivery_date ? (
              <span style={{ color: 'red' }}>{formik.errors.delivery_date}</span>
            ) : (
              ''
            )}
          </InputLabel>
          <Select
            id="dayOfWeek"
            name="dayOfWeek"
            value={formik.values.delivery_date.charAt(0).toUpperCase() + formik.values.delivery_date.slice(1)}
            onBlur={formik.handleBlur}
            onChange={event => {
              formik.setFieldValue('delivery_date', event.target.value);
            }}
            className={styles.selectTag}
            label="Select the Day"
          >
            <MenuItem value="">
              <em>Select the day</em>
            </MenuItem>
            {daysOfWeek.map(day => (
              <MenuItem
                key={day}
                value={day}
              >
                {day}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid>
          <InputLabel
            htmlFor="subscription_frequency"
            className={styles.label}
          >
            Subscription Frequency:
            {formik.touched.subscription_frequency && formik.errors.subscription_frequency ? (
              <span style={{ color: 'red' }}>{formik.errors.subscription_frequency}</span>
            ) : (
              ''
            )}
          </InputLabel>
          <Select
            id="subscription_frequency"
            name="subscription_frequency"
            value={formik.values.subscription_frequency}
            onChange={handleFrequency}
            onBlur={formik.handleBlur}
            className={styles.selectTag}
          >
            <MenuItem value="Select an option">Select an option</MenuItem>
            <MenuItem value={1}>Once a week</MenuItem>
          </Select>
        </Grid>
        <Grid>
          <InputLabel
            htmlFor="delivery_method"
            className={styles.label}
          >
            Delivery method:
            {formik.touched.delivery_method && formik.errors.delivery_method ? (
              <span style={{ color: 'red' }}>{formik.errors.delivery_method}</span>
            ) : (
              ''
            )}
          </InputLabel>
          <Select
            id="delivery_method"
            name="delivery_method"
            value={formik.values.delivery_method}
            onChange={handleDeliveryMethod}
            onBlur={formik.handleBlur}
            className={styles.selectTag}
          >
            <MenuItem value="">
              <em>Select an option</em>
            </MenuItem>
            <MenuItem value={1}>Farmer delivery</MenuItem>
            <MenuItem value={2}>Pick up place</MenuItem>
          </Select>
        </Grid>

        <Grid>
          <InputLabel className={styles.label}>Select a catagory:</InputLabel>

          {formik.touched.category && formik.errors.category && (
            <Grid style={{ color: 'red' }}>{formik.errors.category}</Grid>
          )}

          <Autocomplete
            className={styles.autocomplete}
            multiple
            id="category"
            options={category}
            getOptionLabel={option => option}
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
                sx={{ backgroundColor: 'var(--custom-bg-color)' }}
              />
            )}
          />
        </Grid>
        <Grid>
          <InputLabel className={styles.label}>Is it organic?</InputLabel>
          <Grid className={styles.radioButton}>
            <InputLabel className={styles.label}>
              <Radio
                type="radio"
                name="organic"
                value="Yes"
                checked={formik.values.organic === 'Yes'}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{ width: 'auto' }}
              />
              Yes
            </InputLabel>
            <InputLabel className={styles.label}>
              <Radio
                type="radio"
                name="organic"
                value="No"
                checked={formik.values.organic === 'No'}
                onChange={formik.handleChange}
                style={{ width: 'auto' }}
              />
              No
            </InputLabel>
          </Grid>
          {formik.touched.organic && formik.errors.organic ? (
            <Grid style={{ color: 'red' }}>{formik.errors.organic}</Grid>
          ) : null}
        </Grid>
        <Grid className={styles.submit}>
          <Button
            style={{ background: '#206530', color: '#ffff' }}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Edit;
