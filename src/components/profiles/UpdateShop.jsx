import { Grid } from '@mui/material';

const UpdateShopForm = ({ formik, handlePhotoChange }) => {
  return (
    <>
      <Grid
        item
        md={6}
      >
        <label htmlFor="shopName">
          Shop Name{' '}
          {formik.touched.shopName && formik.errors.shopName ? (
            <span style={{ color: 'red' }}>{formik.errors.shopName} </span>
          ) : (
            ''
          )}
        </label>

        <input
          id="shopName"
          type="text"
          required
          value={formik.values.shopName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </Grid>
      <label htmlFor="shopLogo">
        Shop Logo{' '}
        {formik.touched.shopLogo && formik.errors.shopLogo ? (
          <span style={{ color: 'red' }}>{formik.errors.shopLogo} </span>
        ) : (
          ''
        )}
      </label>

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
        {formik.touched.shopDescription && formik.errors.shopDescription ? (
          <span style={{ color: 'red' }}>{formik.errors.shopDescription} </span>
        ) : (
          ''
        )}
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

export default UpdateShopForm;
