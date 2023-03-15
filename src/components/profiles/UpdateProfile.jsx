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
  // console.log('profile', profile);
  console.log('shop', shop);

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
      // console.log('firstname', values.firstName);
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('profileId', profile.id);

      try {
        const res = await fetch(`${getURL()}api/profiles/update`, {
          method: 'PUT',
          body: formData,
        });

        if (!res.status === '204') {
          throw new Error('Failed to submit data');
        }

        setShowSuccess(true);

        //todo better to just refresh this component than the whole page. Use state to manage profile
        setTimeout(() => {
          router.reload();
        }, 500);

        setEdit(edit => !edit);
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
      shopLogo: shop?.shop_logo || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().max(10).typeError('First name must be a string').required(),
      lastName: Yup.string().max(10).typeError('Last name must be a string').required(),
      shopName: Yup.string().max(20).typeError('Shop name must be a string').required(),
      shopDescription: Yup.string().max(100).required(),
      shopLogo: Yup.mixed().required(),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      // console.log('firstname', values.firstName);
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('shopName', values.shopName);
      formData.append('shopLogo', values.shopLogo);
      formData.append('shopDescription', values.shopDescription);
      formData.append('profileId', profile.id);
      formData.append('farmerId', shop.id);

      try {
        const res = await fetch(`${getURL()}api/profiles/update`, {
          method: 'PUT',
          body: formData,
        });

        if (res.status === 204) {
          setShowSuccess(true);
          //todo better to just refresh this component than the whole page. Use state to manage profile
          setTimeout(() => {
            router.reload();
          }, 1000);

          setEdit(edit => !edit);
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
    // console.log('file', file);
    if (file) {
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
