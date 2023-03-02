import { supabase } from './supabaseClient';

export default async function typeOfUser(id) {
  try {
    const { data, error } = await supabase.from('profiles').select('user_type').eq('id', id).single();

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    return data.user_type;
  } catch (error) {
    return error;
  }
}
