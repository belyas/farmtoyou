import { supabase } from '../../../utils/supabaseClient';

export default async function products(req, res) {
  if (req.method != 'GET') {
    return res.status(405).json({ data: 'Request method must be GET.' });
  }

  if (!req.query || !req.query.id) {
    return res.status(400).send({ data: 'Request query must not be empty.' });
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