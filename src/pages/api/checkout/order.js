import { supabase } from '../../../utils/supabaseClient';

export default async function order(req, res) {
  try {
    const ordersInfo = req.body;

    if (!ordersInfo.profile_id) {
      res.status(400).json({ success: false, error: 'Profile not found' });
      return res;
    }

    if (!ordersInfo.farmer_id) {
      res.status(400).json({ success: false, error: 'Farmer not found' });
      return res;
    }

    const { data, error } = await supabase
      .from('orders')
      .insert(
        {
          profile_id: ordersInfo.profile_id,
          total_amount: ordersInfo.total_amount,
          farmer_id: ordersInfo.farmer_id,
        },
        { onConflict: 'id', returning: 'minimal' },
      )
      .select()
      .maybeSingle();
    if (error) {
      throw error;
    }
    console.log(data);
    createOrderDetails(ordersInfo, data.id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createOrderDetails(ordersInfo, orderId) {
  const ordersDetails = ordersInfo.order_details;
  const orderDetailsToInsert = ordersDetails.map(orderDetailsItem => {
    orderDetailsItem.order_id = orderId;
    return orderDetailsItem;
  });
  const { data, error } = await supabase
    .from('order_details')
    .insert(orderDetailsToInsert, { onConflict: 'id', returning: 'minimal' });

  if (error) {
    throw error;
  }
}
