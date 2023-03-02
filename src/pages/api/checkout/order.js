import { supabase } from '../../../utils/supabaseClient';


export default async function order(req, res) {
    try {
        const  ordersInfo  = req.body
    
    
        const { data, error } = await supabase
          .from('orders')
          .insert({
            id: ordersInfo.id,
            profile_id: ordersInfo.profile_id,
            total_amount: ordersInfo.total_amount,
            farmer_id: ordersInfo.farmer_id
          },
            { onConflict: 'id', returning: 'minimal' }
          )
        if (error) {
          throw error
        }
        res.status(200).json(data)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
}
