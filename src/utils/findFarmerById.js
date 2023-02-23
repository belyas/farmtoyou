import { supabase } from './supabaseClient';

export default async function farmerFound(id) {
  try {
    const { error } = await supabase.from('farmers').select('id').eq('id', id).single();

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    } else {
      return true;
    }
  } catch (error) {
    return false;
  }
}
