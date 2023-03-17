import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getURL } from '@/utils';
import { useRouter } from 'next/router';
import UpdateUserProfile from './UpdateUserProfile';
import UpdateFarmerProfile from '@/components/profiles/UpdateFarmerProfile';

export default function UpdateProfile({
  profile,
  shop,
  setEdit,
  showError,
  setShowError,
  showSuccess,
  setShowSuccess,
}) {
  const router = useRouter();

  const userFormik = useFormik({
    initialValues: {
      firstName: profile.firstname || '',
      lastName: profile.lastname || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(10).typeError('First name must be a string').required(),
      lastName: Yup.string().max(10).typeError('Last name must be a string').required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('profileId', profile.id);

      try {
        const res = await fetch(`${getURL()}api/profiles/update`, {
          method: 'PUT',
          body: formData,
          header: { 'content-type': 'multipart/form-data' },
        });

        if (res.ok) {
          setShowSuccess(true);

          setTimeout(() => {
            router.reload();
          }, 1000);
        }
      } catch (error) {
        setShowError(true);
      }
      setSubmitting(false);
    },
  });

  const farmerFormik = useFormik({
    initialValues: {
      firstName: profile.firstname || '',
      lastName: profile.lastname || '',
      shopName: shop?.shop_name || '',
      shopDescription: shop?.shop_description || '',
      shopLogo: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(10).typeError('First name must be a string').required(),
      lastName: Yup.string().max(10).typeError('Last name must be a string').required(),
      shopName: Yup.string().max(20).typeError('Shop name must be a string').required(),
      shopDescription: Yup.string().max(100).required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('shopName', values.shopName);
      formData.append('shopLogo', values.shopLogo);
      formData.append('shopDescription', values.shopDescription);
      formData.append('profileId', profile.id);
      formData.append('farmerId', shop.id);
      formData.append('oldShopLogo', shop.shop_logo);

      try {
        const res = await fetch(`${getURL()}api/profiles/update`, {
          method: 'PUT',
          body: formData,
          header: { 'content-type': 'multipart/form-data' },
        });

        if (res.ok) {
          setShowSuccess(true);
          setTimeout(() => {
            router.reload();
          }, 1000);

          setSubmitting(false);
        } else {
          setShowError(true);
        }
      } catch (error) {
        setShowError(true);
      }
    },
  });

  const handlePhotoChange = event => {
    const file = event.target.files[0];

    if (file.size > 1048576) {
      alert('Image too big!');
      farmerFormik.setFieldValue('shopLogo', null);
    } else {
      farmerFormik.setFieldValue('shopLogo', file);
    }
  };

  return (
    <>
      {shop ? (
        <UpdateFarmerProfile
          formik={farmerFormik}
          showError={showError}
          setShowError={setShowError}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
          handlePhotoChange={handlePhotoChange}
        />
      ) : (
        <UpdateUserProfile
          formik={userFormik}
          showError={showError}
          setShowError={setShowError}
          showSuccess={showSuccess}
          setShowSuccess={setShowSuccess}
        />
      )}
    </>
  );
}
