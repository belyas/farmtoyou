export default async function remove(req, res, supabase) {
  if (req.method == 'DELETE') {
    const productId = req.query.id;

    if (!productId) {
      return res.status(400).json({ data: 'product id was missing' });
    }

    const { error } = await supabase.from('products').delete().eq('id', productId);

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(204);
  }
}
