import { Snackbar, Alert } from '@mui/material';

const ProfileSnackBar = ({ showError, showSuccess, setShowError, setShowSuccess }) => {
  return (
    <>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Failed to submit data</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">Successfully submitted data</Alert>
      </Snackbar>
    </>
  );
};

export default ProfileSnackBar;
