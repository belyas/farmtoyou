import { supabase } from '../../../utils/supabaseClient';
import hasEmptyValue from '../../../utils/hasEmptyValue';
import validDate from '@/utils/isValideDate';
import hasAllFields from '@/utils/hasAllFields';
import correctDBArray from '@/utils/isCorrectDBArrayFormat';

export default async function add(req, res) {
  if (req.method != 'POST') {
    return res.status(405).json({ data: 'Request method must be POST.' });
  }
  const isEmptyBody = Object.keys(req.body).length === 0 ? true : false;

  if (isEmptyBody) {
    return res.status(400).json({ data: 'Request body must not be empty' });
  }

  const body = req.body;

  //Need to have all required fields
  const fields = [
    'farmer_id',
    'title',
    'price',
    'delivery_date',
    'subscription_frequency',
    'subscription_start',
    'subscription_end',
    'photo',
    'organic',
    'category',
    'description',
    'quantity',
    'delivery_method',
  ];

  if (!hasAllFields(Object.keys(body), fields)) {
    return res.status(400).json({ data: 'Need to have all required fields.' });
  }

  const emptyValue = hasEmptyValue(Object.values(body));

  if (emptyValue) {
    return res.status(400).json({ data: 'All fields must not be empty' });
  }

  console.log('body', body);
  const isValidDate = validDate(body.subscription_start, body.subscription_end);

  if (!isValidDate.valid) {
    return res.status(400).json({ data: isValidDate.message });
  }

  const priceIsPositiveInt = Math.sign(body.price) === 1;
  const quantityIsPositiveInt = Math.sign(body.quantity) === 1;

  if (!priceIsPositiveInt) {
    return res.status(400).json({ data: 'Price must be a positive integer' });
  }
  if (!quantityIsPositiveInt) {
    return res.status(400).json({ data: 'Quantity must be a positive integer' });
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  //question: should case be ignored in this check?
  const deliveryDateInWeek = daysOfWeek.findIndex(day => day === body.delivery_date) !== -1;
  if (!deliveryDateInWeek) {
    return res.status(400).json({ data: 'Delivery date must be a day of a week' });
  }

  if (body.subscription_frequency !== 1) {
    return res.status(400).json({ data: 'Delivery frequency must be 1' });
  }

  if (typeof body.organic !== 'boolean') {
    return res.status(400).json({ data: 'Organic field must provide a boolean value' });
  }

  if (!correctDBArray(body.delivery_method)) {
    return res.status(400).json({ data: 'Delivery method must use {*} database array format.' });
  }

  try {
    const { error } = await supabase.from('products').insert(body);
    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }
    return res.status(200).json({ data: 'Product created!' });
  } catch (error) {
    return res.status(500).json({ data: 'Internal Server Error.', error });
  }
}
