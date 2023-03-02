import { supabase } from '../../../utils/supabaseClient';


export default async function orderDetail(req, res) {
    try {
        const  ordersDetailInfo  = req.body
    
    
        const { data, error } = await supabase
          .from('order_details')
          .insert({
            id: ordersDetailInfo.id,
            created_at: new Date(),
            product_title: ordersDetailInfo.product_title,
            product_quantity: ordersDetailInfo.product_quantity,
            product_price: ordersDetailInfo.product_price,
            total_price: ordersDetailInfo.total_price,
            order_id: ordersDetailInfo.order_id,
            product_id: ordersDetailInfo.product_id
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