import { supabase } from './supabaseClient';

export default async function isUserFarmer(id) {
  try {
    const { data, error } = await supabase.from('profiles').select('farmers(id)').eq('id', id).single();

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    console.log('farmer Id query:', data);

    if (!data.farmers.length) {
      return false;
    } else {
      return data.farmers[0].id;
    }
  } catch (error) {
    return error;
  }
}
