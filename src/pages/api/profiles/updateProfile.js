import hasEmptyValue from '../../../utils/hasEmptyValue';

export default async function update(req, res, supabase) {
  if (req.method == 'PUT') {
    const { id: profileId, ...body } = req.body;
    const emptyValue = hasEmptyValue(Object.values(body));

    if (emptyValue) {
      return res.status(400).json({ data: 'All fields must not be empty' });
    }

    const { error } = await supabase.from('profiles').update(body).eq('id', profileId);

    if (error) {
      return res.status(500).json({ error });
    }

    return res.status(204).json({ seccess: true });
  }
}