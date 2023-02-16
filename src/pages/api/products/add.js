import { supabase } from '../../../utils/supabaseClient';
import hasEmptyValue from '@/utils/hasEmptyValue';

export default async function add(req, res) {
  if (req.method != 'POST') {
    return res.status(405).json({ data: 'Request method must be POST.' });
  }
  const isEmptyBody = Object.keys(req.body).length === 0 ? true : false;

  if (isEmptyBody) {
    return res.status(400).json({ data: 'Request body must not be empty' });
  }

  const body = req.body;

  const emptyValue = hasEmptyValue(Object.values(body));

  if (emptyValue) {
    return res.status(400).json({ data: 'All fields must not be empty' });
  }

  try {
    const { error } = await supabase.from('products').insert(body);
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    return res.status(200).json({ data: 'Product created!' });
  } catch (error) {
    return res.status(500).json({ data: 'Internal Server Error.' });
  }
}
