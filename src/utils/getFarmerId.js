import { supabase } from './supabaseClient';

export default async function isUserFarmer(id) {
  try {
    const { data, error } = await supabase.from('farmer_profile').select('id').eq('profile_id', id).single();

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    //if not found in db, an error will be thrown
    //if found, db returns {id:15}(example)

    return data.id;
  } catch (error) {
    return false;
  }
}
