import { useFormik } from 'formik';
import { getURL } from '@/utils';
import ProfileSnackBar from './SnackBar';

export default function UpdatePayment({ payment, setEdit, showError, setShowError, showSuccess, setShowSuccess }) {
  console.log('payment', payment);
  const formik = useFormik({
    initialValues: {
      cardHolder: payment?.card_holder || '',
      cardNumber: payment?.card_number || '',
      expirationDate: payment?.expiration_date || '',
      cvv: '',
    },
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('profileId', payment.profile_id);
      formData.append('cardHolder', values.cardHolder);
      formData.append('cardNumber', values.cardNumber);
      formData.append('expirationDate', values.expirationDate);
      formData.append('cvv', values.cvv);

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
            value={`${'*'.repeat(12)}${formik.values.cardNumber}`}
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
