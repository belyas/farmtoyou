import { supabase } from '../../../utils/supabaseClient';

const hasEmptyValue = array => {
  const found = array.find(item => item === undefined || item === '' || item === null);
  return found !== undefined;
};

export default async function add(req, res) {
  if (req.method != 'POST') {
    return res.status(500).json({ data: 'Request method must be POST.' });
  }
  const isEmptyBody = Object.keys(req.body).length === 0 ? true : false;

  if (isEmptyBody) {
    return res.status(500).json({ data: 'Request body must not be empty' });
  }

  const body = req.body;

  const bodyValues = Object.values(body);

  const emptyValue = await hasEmptyValue(Object.values(body));

  if (emptyValue) {
    return res.status(500).json({ data: 'All fields must not be empty' });
  }

  //QQ:More validations?

  const { error } = await supabase.from('products').insert(body);

  if (!error) {
    return res.status(200).json({ data: 'Product created!' });
  } else {
    return res.status(500).json({ data: 'Internal Server Error.' });
  }
}
