import { supabase } from '@/utils/supabaseClient';
import hasEmptyValue from '@/utils/hasEmptyValue';
export default async function update(req, res, supabase) {
  if (req.method == 'PUT') {
    const {
      id: productId,
      title,
      price,
      description,
      delivery_date,
      subscription_end,
      subscription_start,
      subscription_frequency,
      category,
      organic,
      farmer_id,
      quantity,
      delivery_method,
    } = req.body;
    const emptyValue = hasEmptyValue(Object.values(req.body));

    if (emptyValue) {
      return res.status(400).json({ data: 'All fields must not be empty' });
    }

    const { error } = await supabase
      .from('products')
      .update({
        title,
        price,
        description,
        delivery_date,
        subscription_end,
        subscription_start,
        subscription_frequency,
        category,
        organic,
        farmer_id,
        quantity,
        delivery_method,
      })
      .eq('id', productId);

    if (error) {
      console.log(error);
      return res.status(500).json({ error });
    }

    return res.status(204).json({ seccess: true });
  }
}
export const config = {
  api: {
    bodyParser: false,
  },
};
