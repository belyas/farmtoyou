import { Snackbar, Alert } from '@mui/material';

const ProfileSnackBar = ({ showError, showSuccess, setShowError, setShowSuccess }) => {
  console.log(showSuccess);
  return (
    <>
      <Snackbar
        open={showError}
        autoHideDuration={3000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error">Something went wrong...</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">Information updated! </Alert>
      </Snackbar>
    </>
  );
};

export default ProfileSnackBar;
