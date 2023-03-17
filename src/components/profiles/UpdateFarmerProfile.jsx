import ProfileSnackBar from './SnackBar';
import { Grid } from '@mui/material';
import UpdateShopForm from './UpdateShop';

const UpdateFarmerProfile = ({ formik, handlePhotoChange, showError, showSuccess, setShowError, setShowSuccess }) => {
  return (
    <form
      action="/api/profiles/update"
      method="post"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
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
          md={6}
        >
          <label htmlFor="firstName">
            First Name
            {formik.touched.firstName && formik.errors.firstName ? (
              <span style={{ color: 'red' }}>{formik.errors.firstName} </span>
            ) : (
              ''
            )}
          </label>

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
          <label htmlFor="lastName">
            Last Name
            {formik.touched.lastName && formik.errors.lastName ? (
              <span style={{ color: 'red' }}>{formik.errors.lastName} </span>
            ) : (
              ''
            )}
          </label>

          <input
            type="text"
            id="lastName"
            required
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>

        <UpdateShopForm
          handlePhotoChange={handlePhotoChange}
          formik={formik}
        />

        <button type="submit">Save</button>
      </Grid>
    </form>
  );
};

export default UpdateFarmerProfile;
