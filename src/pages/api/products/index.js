import { supabase } from '../../../utils/supabaseClient';

export default async function list(req, res) {
  if (req.method != 'GET') {
    return res.status(405).json({ data: 'Request method must be GET.' });
  }

  try {
    const { error, data } = await supabase.from('products').select();
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ data: 'Internal Server Error.' });
  }
}
