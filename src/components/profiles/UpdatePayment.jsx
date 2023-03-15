import { useFormik } from 'formik';
import { getURL } from '@/utils';

export default function UpdatePayment({ payment, setEdit }) {
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
      } catch (error) {
        alert(error);
      }

      if (res.status !== 204) {
        alert('failed to update');
      }

      setEdit(edit => !edit);
    },
  });
  return (
    <>
      <form
        method="post"
        action="/api/profiles/update"
        onSubmit={formik.handleSubmit}
        noValidate
      >
        <label>
          Card Holder
          <input
            type="text"
            value={formik.values.cardHolder}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Card Number
          <input
            type="text"
            value={`${'*'.repeat(12)}${formik.values.cardNumber}`}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          Expiration Date
          <input
            type="date"
            value={formik.values.expirationDate}
            onChange={formik.handleChange}
          />
        </label>
        <label>
          CVV
          <input
            type="number"
            value={formik.values.cvv}
            onChange={formik.handleChange}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </>
  );
}
