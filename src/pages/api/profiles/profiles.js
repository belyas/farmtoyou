import { supabase } from '../../../utils/supabaseClient';
import { update } from '../profiles/updateProfile';

export default async function getProfile(req, res) {
  if (req.method == 'PUT') {
    return update(req, res, supabase);
  }

  if (req.method !== 'GET') {
    return res.status(405).send({ data: 'Request must be GET' });
  }
  if (!req.body) {
    return res.status(400).send({ data: 'Request must not be empty.' });
  }
  const profile_id = req.body;

  try {
    const { data, error } = await supabase
      .from('farmers')
      .update(body)
      .select('*, profiles!inner (*)')
      .eq('profile_id', profile_id)
      .single();
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    if (!data) {
      res.status(404).json({ data: 'not found' });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ data: 'Internal Server Error.', error });
  }
}
