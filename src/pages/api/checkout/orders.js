import { supabase } from '../../../utils/supabaseClient';

export default async function orders(req, res) {
  try {
    const orders = req.body.orders;

    for (const order_farmer_id in orders) {
      const farmer_id = order_farmer_id;
      const total_amount = orders[order_farmer_id].total_amount;
      const products = orders[order_farmer_id].products;
      const profile_id = orders[order_farmer_id].profile_id;

      if (!profile_id) {
        res.status(400).json({ success: false, error: 'Profile not found' });
        return res;
      }

      if (!farmer_id) {
        res.status(400).json({ success: false, error: 'Farmer not found' });
        return res;
      }

      const { data, error } = await supabase
        .from('orders')
        .insert(
          {
            profile_id: profile_id,
            total_amount: total_amount,
            farmer_id: farmer_id,
          },
          { onConflict: 'id', returning: 'minimal' },
        )
        .select()
        .maybeSingle();
      if (error) {
        throw error;
      }
      console.log(data);
      await createOrderDetails(products, data.id);
      res.status(200).json(data);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function createOrderDetails(products, orderId) {
  const orderDetailsToInsert = products.map(orderDetailsItem => {
    return {
    order_id: orderId,
    product_id: orderDetailsItem.id,
    product_title: orderDetailsItem.title,
    product_quantity: orderDetailsItem.quantity,
    product_price: orderDetailsItem.price,
    total_price: orderDetailsItem.price * orderDetailsItem.quantity
    }
  });
  const { error } = await supabase
    .from('order_details')
    .insert(orderDetailsToInsert, { onConflict: 'id', returning: 'minimal' });

  if (error) {
    throw error;
  }
}
