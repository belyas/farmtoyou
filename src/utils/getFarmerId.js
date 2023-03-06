import { supabase } from './supabaseClient';

export default async function isUserFarmer(id) {
  try {
    const { data, error } = await supabase.from('farmer_profile').select('id').eq('profile_id', id).maybeSingle();
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    //if not found in db, data is null
    //if found, db returns {id:15}(example)
    return data?.id;
  } catch (error) {
    return error;
  }
}
