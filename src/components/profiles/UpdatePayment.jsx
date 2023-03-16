import { useFormik } from 'formik';
import { getURL } from '@/utils';
import ProfileSnackBar from './SnackBar';
import { useRouter } from 'next/router';
import valid from 'card-validator';
import * as Yup from 'yup';
import { Button } from '@mui/material';
import { Grid } from '@mui/material';

export default function UpdatePayment({ payment, setEdit, showError, setShowError, showSuccess, setShowSuccess }) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      expirationDate: payment?.card_holder || '',
      cardNumber: payment ? `${'*'.repeat(12)}${payment?.card_number}` : '',
      expirationDate: payment?.expiration_date || '',
      cvv: '',
    },
    validationSchema: Yup.object().shape({
      expirationDate: Yup.string()
        .test('test-card-holder', 'Card holder is invalid', value => valid.expirationDateName(value).isValid)
        .required(),
      cardNumber: Yup.string().max(16).min(15).required(),
      expirationDate: Yup.string().required(),
      cvv: Yup.string().test('test-cvv', 'Card cvv is invalid', value => valid.cvv(value).isValid),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = {};

      formData.profile_id = payment.profile_id;
      formData.card_holder = values.expirationDate;
      formData.card_number = values.cardNumber;
      formData.card_cvv = values.cvv;
      formData.expiration_date = values.expirationDate;

      try {
        const res = await fetch(`${getURL()}api/checkout/payment`, {
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
    <>
      <form
        method="post"
        action="/api/profiles"
        onSubmit={formik.handleSubmit}
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
          spacing={2}
        >
          <Grid
            item
            md={6}
            xs={12}
          >
            <label>Card Holder</label>
            {formik.touched.cardHolder && formik.errors.cardHolder ? (
              <span style={{ color: 'red' }}>{formik.errors.cardHolder} </span>
            ) : (
              ''
            )}
            <input
              type="text"
              id="cardHolder"
              value={formik.values.cardHolder}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <label>Card Number </label>
            {formik.touched.cardNumber && formik.errors.cardNumber ? (
              <span style={{ color: 'red' }}>{formik.errors.cardNumber} </span>
            ) : (
              ''
            )}
            <input
              type="text"
              id="cardNumber"
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <label>Expiration Date </label>
            {formik.touched.expirationDate && formik.errors.expirationDate ? (
              <span style={{ color: 'red' }}>{formik.errors.expirationDate} </span>
            ) : (
              ''
            )}
            <input
              type="text"
              id="expirationDate"
              value={formik.values.expirationDate}
              onChange={formik.handleChange}
              placeholder="MON/YEAR e.g.,'01/2025'"
            />
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
          >
            <label>CVV </label>
            {formik.touched.cvv && formik.errors.cvv ? <span style={{ color: 'red' }}>{formik.errors.cvv} </span> : ''}
            <input
              type="text"
              value={formik.values.cvv}
              id="cvv"
              onChange={formik.handleChange}
              placeholder="Check the back of your card, 3 digits number"
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
    </>
  );
}
