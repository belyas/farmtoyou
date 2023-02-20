import { supabase } from '../../../utils/supabaseClient';

const getProducts = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).send({ data: 'Requst method must be GET' });
  }
  if (!req.query) {
    return res.status(400).send({ data: 'Request query must not be empty.' });
  }
  const farmer_id = parseInt(req.query.id);

  if (!Number.isInteger(farmer_id)) {
    return res.status(400).send({ data: 'Id must be an integer' });
  }
  try {
    const { data, error } = await supabase.from('products').select().eq('farmer_id', farmer_id);

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    if (!data) {
      res.status(404).json({ data: 'not found' });
    }
    res.status(200).json({ data: data });
  } catch (error) {
    return res.status(500).json({ data: 'Internal Server Error.' });
  }
};

export default getProducts;
