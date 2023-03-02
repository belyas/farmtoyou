import { supabase } from './supabaseClient';

export default async function getFarmerId(id) {
  try {
    const { data, error } = await supabase.from('farmers').select('id').eq('profile_id', id).single();

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    return data.id;
  } catch (error) {
    return error;
  }
}
