import { useState } from 'react';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getURL } from '@/utils';
import { useRouter } from 'next/router';

const UpdateShopForm = ({ formik, handlePhotoChange }) => {
  return (
    <>
      <Grid
        item
        md={6}
      >
        <label htmlFor="shopName">Shop Name</label>
        <input
          id="shopName"
          type="text"
          required
          value={formik.values.shopName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <label htmlFor="shopLogo">Shop Logo</label>
      <input
        type="file"
        name="shopLogo"
        onChange={handlePhotoChange}
        onBlur={formik.handleBlur}
      />
      <Grid
        item
        md={12}
      >
        <label htmlFor="shopDescription">Shop Description</label>
        <input
          id="shopDescription"
          type="text"
          required
          value={formik.values.shopDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
    </>
  );
};

export default function UpdateProfile({ profile, shop }) {
  const router = useRouter();

  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: profile.firstname,
      lastName: profile.lastname,
      shopName: shop.shop_name,
      shopDescription: shop.shop_description,
      shopLogo: shop.shop_logo,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(10).typeError('First name must be a string').required(),
      lastName: Yup.string().max(10).typeError('Last name must be a string').required(),
      shopName: Yup.string().max(20).typeError('Shop name must be a string').required(),
      shopDescription: Yup.string().max(100).required(),
      shopLogo: Yup.mixed().required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // alert(JSON.stringify(values, null, 2));
      const newProfile = JSON.stringify(values, null, 2);
      console.log('new profile', newProfile);
      try {
        const res = await fetch(`${getURL()}api/profiles/update`, {
          method: 'POST',
          body: newProfile,
        });
        if (!res.ok) {
          throw new Error('Failed to submit data');
        }

        setShowSuccess(true);

        setTimeout(() => {
          router.push('/profile');
        }, 500);
      } catch (error) {
        setShowError(true);
      }
      setSubmitting(false);
    },
  });
  const handlePhotoChange = event => {
    const file = event.target.files[0];
    console.log('file', file.name);
    formik.setFieldValue('shopLogo', file.name);
  };

  return (
    <form
      action="/api/profiles/update"
      method="post"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
      noValidate
    >
      <Grid container>
        <Grid
          item
          md={6}
        >
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            required
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid
          item
          md={6}
        >
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            required
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        {shop ? (
          <UpdateShopForm
            handlePhotoChange={handlePhotoChange}
            formik={formik}
          />
        ) : null}

        <button type="submit">Save</button>
      </Grid>
    </form>
  );
}
