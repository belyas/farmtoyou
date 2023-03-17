import { Grid } from '@mui/material';
import ProfileSnackBar from './SnackBar';
import Button from '@mui/material/Button';

const UpdateUserProfile = ({ formik, showError, showSuccess, setShowError, setShowSuccess }) => {
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
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          md={6}
          xs={12}
        >
          <label htmlFor="firstName">
            First Name{' '}
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
          xs={12}
        >
          <label htmlFor="lastName">
            Last Name{' '}
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
        <Grid
          item
          md={12}
        >
          <Button
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UpdateUserProfile;
