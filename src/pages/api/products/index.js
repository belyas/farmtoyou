import { supabase } from '../../../utils/supabaseClient';

export default async function products(req, res) {
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
      return res.status(200).json({ data: data });
    } catch (error) {
      return res.status(500).json({ data: 'Internal Server Error.', error });
    }
  }
  // const farmer_id = parseInt(req.query.id);

  //   if (!Number.isInteger(farmer_id)) {
  //     return res.status(400).send({ data: 'Id must be an integer' });
  //   }
  //   try {
  //     const { data, error } = await supabase.from('products').select().eq('farmer_id', farmer_id);

  //     if (error) {
  //       throw typeof error === 'string' ? new Error(error) : error;
  //     }

  //     if (!data) {
  //       res.status(404).json({ data: 'not found' });
  //     }
  //     res.status(200).json({ data: data });
  //   } catch (error) {
  //     return res.status(500).json({ data: 'Internal Server Error.' });
  //   }
};
