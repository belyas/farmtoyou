import { supabase } from '../../../utils/supabaseClient';

export default async function address(req, res) {
  try {
    const addressDetail = req.body;
    if (!addressDetail.profile_id) {
      res.status(400).json({ success: false, error: 'Profile not found' });
      return res;
    }

    const { data, error } = await supabase
      .from('addresses')
      .select()
      .eq('profile_id', addressDetail.profile_id)
      .maybeSingle();
    if (data) {
      addressDetail.id = data.id;
    } else {
      addressDetail.id = null;
    }

    const result = await supabase.from('addresses').upsert(
      {
        id: addressDetail.id,
        profile_id: addressDetail.profile_id,
        address_1: addressDetail.address_1,
        address_2: addressDetail.address_2,
        country: addressDetail.country,
        city: addressDetail.city,
        province: addressDetail.province,
        code_postal: addressDetail.code_postal,
        phone: addressDetail.phone,
        firstname: addressDetail.firstname,
        lastname: addressDetail.lastname,
      },
      { onConflict: 'id', returning: 'minimal' },
    );

    if (!error) {
      res.status(201).json({ success: true, data });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
