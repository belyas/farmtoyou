import { supabase } from '../../../utils/supabaseClient';

export default async function update(req, res) {
  if (req.method == 'PUT') {
    const { data, error } = await supabase.from('products').update(req.body).eq('id', req.body.id);
    return res.status(200).json({ data, error });
  }
}
