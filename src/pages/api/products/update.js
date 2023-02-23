import hasEmptyValue from '../../../utils/hasEmptyValue';

export default async function update(req, res, supabase) {
  if (req.method == 'PUT') {
    const { id: productId, ...body } = req.body;
    const emptyValue = hasEmptyValue(Object.values(body));

    if (emptyValue) {
      return res.status(400).json({ data: 'All fields must not be empty' });
    }

    const { error } = await supabase.from('products').update(body).eq('id', productId);

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(204).json({ seccess: true });
  }
}
