import { useFormik } from 'formik';
import { getURL } from '@/utils';
import ProfileSnackBar from './SnackBar';
import { useRouter } from 'next/router';
import valid from 'card-validator';
import * as Yup from 'yup';

export default function UpdatePayment({ payment, setEdit, showError, setShowError, showSuccess, setShowSuccess }) {
  // console.log('payment', payment);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      cardHolder: payment?.card_holder || '',
      cardNumber: `${'*'.repeat(12)}${payment?.card_number}` || '',
      expirationDate: payment?.expiration_date || '',
      cvv: '',
    },
    validationSchema: Yup.object().shape({
      cardHolder: Yup.string()
        .test('test-card-holder', 'Card holder is invalid', value => valid.cardholderName(value).isValid)
        .required(),
      cardNumber: Yup.string().max(16).min(15).required(),
      expirationDate: Yup.string().required(),
      cvv: Yup.string().test('test-cvv', 'Card cvv is invalid', value => valid.cvv(value).isValid),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const formData = {};

      formData.profile_id = payment.profile_id;
      formData.card_holder = values.cardHolder;
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
        <label>
          Card Holder
          <input
            type="text"
            id="cardHolder"
            value={formik.values.cardHolder}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Card Number
          <input
            type="text"
            id="cardNumber"
            value={formik.values.cardNumber}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Expiration Date
          <input
            type="date"
            id="expirationDate"
            value={formik.values.expirationDate}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          CVV
          <input
            type="number"
            value={formik.values.cvv}
            id="cvv"
            onChange={formik.handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
