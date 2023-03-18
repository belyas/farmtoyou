import { supabase } from '../../../utils/supabaseClient';
import hasAllFields from '@/utils/hasAllFields';
import hasEmptyValue from '@/utils/hasEmptyValue';

export default async function payment(req, res) {
  //create
  if (req.method === 'POST') {
    const newPayment = req.body;
    const allFields = hasAllFields(Object.keys(newPayment), [
      'card_holder',
      'card_number',
      'card_cvv',
      'expiration_date',
      'profile_id',
    ]);
    if (!allFields) {
      return res.status(404).json({ data: 'Request must have all fields' });
    }

    if (hasEmptyValue(Object.values(newPayment))) {
      return res.status(404).json({ data: "Request mustn't have empty value." });
    }

    try {
      const { error } = await supabase.from('payments').create(newPayment);
      if (error) {
        return res.status(500).json({ data: 'Internal server error' }, error);
      }
      return res.status(201).json({ data: 'Payment updated!' });
    } catch (error) {
      return res.status(500).json({ data: 'Internal server error' }, error);
    }
  }

  //update
  if (req.method === 'PUT') {
    const _newPayment = req.body;

    if (hasEmptyValue(Object.values(_newPayment))) {
      return res.status(404).json({ data: "Request mustn't have empty value." });
    }

    const { profile_id, ...newPayment } = _newPayment;

    try {
      const { error } = await supabase.from('payments').update(newPayment).eq('profile_id', profile_id);
      if (error) {
        return res.status(500).json({ data: 'Internal server error' }, error);
      }
      return res.status(201).json({ data: 'Payment updated!' });
    } catch (error) {
      return res.status(500).json({ data: 'Internal server error' }, error);
    }
  }

  //create
}
//   try {
//     const paymentData = req.body;
//     console.log('payment', paymentData);
//     if (!paymentData.profile_id) {
//       res.status(400).json({ success: false, error: 'Profile not found' });
//       return res;
//     }

//     const { data, error } = await supabase
//       .from('payments')
//       .select()
//       .eq('profile_id', paymentData.profile_id)
//       .maybeSingle();

//     if (data) {
//       paymentData.id = data.id;
//     }

//     const result = await supabase.from('payments').upsert(
//       {
//         id: paymentData.id,
//         created_at: new Date(),
//         card_holder: paymentData.card_holder,
//         card_number: paymentData.card_number,
//         card_cvv: paymentData.card_cvv,
//         expiration_date: paymentData.expiration_date,
//         profile_id: paymentData.profile_id,
//       },
//       { onConflict: 'id', returning: 'minimal' },
//     );
//     if (error) {
//       throw error;
//     }

//     res.status(201).json(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
