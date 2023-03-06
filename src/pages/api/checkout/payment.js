import { supabase } from '../../../utils/supabaseClient';

export default async function payment(req, res) {
  try {
    const paymentData = req.body;

    if (!paymentData.profile_id) {
      res.status(400).json({ success: false, error: 'Profile not found' });
      return res;
    }

    const { data, error } = await supabase.from('payments')
      .select().eq('profile_id', paymentData.profile_id).maybeSingle();

    if (data) {
      paymentData.id = data.id;
    }

    const result = await supabase.from('payments').upsert(
      {
        id: paymentData.id,
        created_at: new Date(),
        card_holder: paymentData.card_holder,
        card_number: paymentData.card_number,
        card_cvv: paymentData.card_cvv,
        expiration_date: paymentData.expiration_date,
        profile_id: paymentData.profile_id,
      },
      { onConflict: 'id', returning: 'minimal' },
    );
    if (error) {
      throw error;
    }
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


