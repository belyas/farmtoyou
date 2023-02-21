import { supabase } from '../../../utils/supabaseClient';
import update from './update';
import remove from './remove';

export default async function products(req, res) {
  if (req.method == 'PUT') {
    return update(req, res, supabase);
  }

  if (req.method == 'DELETE') {
    return remove(req, res, supabase);
  }

  if (req.method != 'GET') {
    return res.status(405).json({ data: 'Request method must be GET.' });
  }
  //if no query params, return the latest 20 products
  if (!req.query || !req.query.id) {
    try {
      const { data, error } = await supabase.from('products').select().order('created_at').limit(20);
      if (error) {
        throw typeof error === 'string' ? new Error(error) : error;
      }
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ data: 'Internal Server Error.', error });
    }
  }

  try {
    const profileId = req.query.id;
    let { error, data = [] } = await supabase
      .from('products')
      .select('*, farmers ( profile_id )')
      .eq('farmers.profile_id', profileId);

    // TODO: improve the above query to only return rows related to current farmer
    if (data.length > 0) {
      data = data.filter(product => product.farmers?.profile_id === profileId);
    }

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    return res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ data: 'Internal Server Error.', error });
  }
}
