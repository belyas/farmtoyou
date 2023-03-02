import hasEmptyValue from '../../../utils/hasEmptyValue';

export default async function update(req, res, supabase) {
  const { id: productId, photo: newPhoto, ...body } = req.body;
  const emptyValue = hasEmptyValue(Object.values(body));
  if (emptyValue) {
    return res.status(400).json({ data: 'All fields must not be empty' });
  }

  let oldPhoto = null;

  // Retrieve the old photo filename from the database
  const { data: productData, error: productError } = await supabase
    .from('products')
    .select('photo')
    .eq('id', productId)
    .single();

  if (productError) {
    return res.status(500).json({ error: productError.message });
  }

  if (productData) {
    oldPhoto = productData.photo;
  }

  if (newPhoto && oldPhoto) {
    // Delete the old photo from the database
    const { error: deleteError } = await supabase.storage
      .from('products')
      .remove([oldPhoto]);

    if (deleteError) {
      return res.status(500).json({ error: deleteError.message });
    }
  }

  // Update the product record with the new photo filename
  const { error: updateError } = await supabase
    .from('products')
    .update({ ...body, photo: newPhoto })
    .eq('id', productId);

  if (updateError) {
    return res.status(500).json({ error: updateError.message });
  }

  return res.status(204).json({ success: true });
}
