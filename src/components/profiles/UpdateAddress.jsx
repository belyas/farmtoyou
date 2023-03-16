import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getURL } from '@/utils';
import { useRouter } from 'next/router';
import ProfileSnackBar from './SnackBar';

export default function UpdateAddress({ address, setEdit, showError, setShowError, showSuccess, setShowSuccess }) {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      firstName: address?.firstname || '',
      lastName: address?.lastname || '',
      address1: address?.address_1 || '',
      address2: address?.address_2 || '',
      city: address?.city || '',
      province: address?.province || '',
      country: address?.country || '',
      codePostal: address?.code_postal || '',
      phone: address?.phone || '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      address1: Yup.string().required('Address line 1 is required'),
      city: Yup.string().required('City is required'),
      country: Yup.string().required('Country is required'),
      codePostal: Yup.string().required('Postal/Zip code is required'),
      province: Yup.string().required('Province is required'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^(\+?\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number'),
    }),

    onSubmit: async (values, { setSubmitting }) => {
      // values.profile_id=address.profile_id

      const formData = {};
      formData.profile_id = address.profile_id;
      formData.address_1 = values.address1;
      formData.address_2 = values.address2;
      formData.country = values.country;
      formData.city = values.city;
      formData.province = values.province;
      formData.code_postal = values.codePostal;
      formData.phone = values.phone;
      formData.firstname = values.firstName;
      formData.lastname = values.lastName;

      try {
        const res = await fetch(`${getURL()}api/checkout/address`, {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: { 'content-type': 'application/json' },
        });

        if (res.status === 201) {
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

  return (
    <form
      action="/api/profiles/update"
      method="post"
      onSubmit={formik.handleSubmit}
      noValidate
    >
      <ProfileSnackBar
        showError={showError}
        setShowError={setShowError}
        showSuccess={showSuccess}
        setShowSuccess={setShowSuccess}
      />
      <Grid container>
        <Grid
          item
          md={4}
          xs={12}
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
        <Grid
          item
          md={6}
        >
          <label htmlFor="address1">Address 1</label>
          <input
            type="text"
            id="address1"
            required
            value={formik.values.address1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>

        <Grid
          item
          md={6}
        >
          <label htmlFor="province">Address 2</label>
          <input
            type="text"
            id="address2"
            required
            value={formik.values.address2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid
          item
          md={6}
        >
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            required
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid
          item
          md={6}
        >
          <label htmlFor="province">Province</label>
          <input
            type="selects"
            id="province"
            required
            value={formik.values.province}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid
          item
          md={6}
        >
          <label htmlFor="country">Country</label>
          <input
            type="select"
            id="country"
            required
            value={formik.values.country}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid
          item
          md={6}
        >
          <label htmlFor="codePostal">Post Code</label>
          <input
            type="text"
            id="codePostal"
            required
            value={formik.values.codePostal}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid
          item
          md={6}
        >
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            required
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
      </Grid>
      <button type="submit">Save</button>
    </form>
  );
}
