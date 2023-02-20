import { supabase } from '../../../utils/supabaseClient';


export default async function getProfile(req, res) {
    if(req.method !== 'GET' ){
      return res.status(405).send({data: 'Request must be GET'})
    }
    if (!req.query) {
      return res.status(400).send({ data: 'Request must not be empty.' });
    }
    const profile_id = parseInt(req.query.id);
  
    if (!Number.isInteger(profile_id)) {
      return res.status(400).send({ data: 'Id must be an integer' });
    }
    try {
      const { data, error } = await supabase.from('profiles').select().eq('farmer_id', profile_id);
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

