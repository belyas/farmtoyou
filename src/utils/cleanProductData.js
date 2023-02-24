import correctDBArray from '@/utils/isCorrectDBArrayFormat';
import farmerFound from '@/utils/findFarmerById';
import validDate from '@/utils/isValidDate';
import isoDate from './isIsoDate';

const cleanData = async (data, res) => {
  const body = data;

  //clean description, title and photo strings
  body.description = body.description.trim();
  body.title = body.title.trim();
  body.photo = body.photo.trim();

  //check date is in ISO format && is in future &&  end>start
  if (!isoDate(body.subscription_start) || isoDate(body.subscription_end)) {
    return res.status(400).json({ data: 'Date must be in ISO format,e.g.,2023-01-01' });
  }
  const isValidDate = validDate(body.subscription_start, body.subscription_end);
  if (!isValidDate.valid) {
    return res.status(400).json({ data: isValidDate.message });
  }

  //check price and quantity are postive Int
  const priceIsPositiveInt = Math.sign(body.price) === 1;
  const quantityIsPositiveInt = Math.sign(body.quantity) === 1;

  if (!priceIsPositiveInt) {
    return res.status(400).json({ data: 'Price must be a positive integer' });
  }
  if (!quantityIsPositiveInt) {
    return res.status(400).json({ data: 'Quantity must be a positive integer' });
  }

  //check farmer exists in db and parse id into Int
  const farmerExists = await farmerFound(parseInt(body.farmer_id));
  if (!farmerExists) {
    return res.status(400).json({ data: 'Farmer id must be valid' });
  }
  body.farmer_id = parseInt(body.farmer_id);

  //check delivery date is within a day of a week and parse delivery_date to lowercase
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const deliveryDateInWeek = daysOfWeek.findIndex(day => day.toLowerCase() === body.delivery_date.toLowerCase()) !== -1;
  if (!deliveryDateInWeek) {
    return res.status(400).json({ data: 'Delivery date must be a day of a week' });
  }
  body.delivery_date = body.delivery_date.toLowerCase();

  if (parseInt(body.subscription_frequency) !== 1) {
    return res.status(400).json({ data: 'Subscription frequency must be 1' });
  }
  body.subscription_frequency = parseInt(body.subscription_frequency);

  //check if organic field is boolean and parse it to boolean
  if (body.organic.toLowerCase() === 'true') {
    body.organic = true;
  } else if (body.organic.toLowerCase() === 'false') {
    body.organic = false;
  } else {
    return res.status(400).json({ data: 'Organic field must provide a boolean value' });
  }

  if (!correctDBArray(body.delivery_method)) {
    return res.status(400).json({ data: 'Delivery method must use {*} database array format.' });
  }

  if (!correctDBArray(body.category)) {
    return res.status(400).json({ data: 'Category field must use {*} database array format.' });
  }

  return body;
};
export default cleanData;
