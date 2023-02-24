import { supabase } from '@/utils/supabaseClient';
import hasEmptyValue from '@/utils/hasEmptyValue';
import validDate from '@/utils/isValidDate';
import hasAllFields from '@/utils/hasAllFields';
import correctDBArray from '@/utils/isCorrectDBArrayFormat';
import farmerFound from '@/utils/findFarmerById';
import formidable from 'formidable';
import path from 'path';

export default async function add(req, res) {
  if (req.method != 'POST') {
    return res.status(405).json({ data: 'Request method must be POST.' });
  }

  const uploadDir = path.join(process.cwd(), 'src/assets/uploads/products');
  const form = formidable({
    maxFiles: 1,
    maxFileSize: 1 * 1024 * 1024,
    uploadDir,
    filename: (_name, _ext, part) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      return `${part.name || 'unknown'}-${uniqueSuffix}.jpg`; // we can improve the extension part, but for now jpg is okay
    },
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: 'fail',
        message: 'There was an error parsing the files',
        error: err,
      });
    }
    const photo = files['photo'].newFilename;

    req.body = fields;

    //asign photo name to body data and pass it to db
    req.body.photo = photo;

    const isEmptyBody = Object.keys(req.body).length === 0 ? true : false;

    if (isEmptyBody) {
      return res.status(400).json({ data: 'Request body must not be empty' });
    }

    const body = req.body;

    //Need to have all required fields
    const formFields = [
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

    if (!hasAllFields(Object.keys(body), formFields)) {
      return res.status(400).json({ data: 'Need to have all required fields.' });
    }

    const emptyValue = hasEmptyValue(Object.values(body));

    if (emptyValue) {
      return res.status(400).json({ data: 'All fields must not be empty' });
    }

    const isValidDate = validDate(body.subscription_start, body.subscription_end);

    if (!isValidDate.valid) {
      return res.status(400).json({ data: isValidDate.message });
    }
    //parse price and quantity to Int
    body.price = parseInt(body.price);
    body.quantity = parseInt(body.quantity);

    const priceIsPositiveInt = Math.sign(body.price) === 1;
    const quantityIsPositiveInt = Math.sign(body.quantity) === 1;

    if (!priceIsPositiveInt) {
      return res.status(400).json({ data: 'Price must be a positive integer' });
    }
    if (!quantityIsPositiveInt) {
      return res.status(400).json({ data: 'Quantity must be a positive integer' });
    }
    const farmerExists = await farmerFound(parseInt(body.farmer_id));
    if (!farmerExists) {
      return res.status(400).json({ data: 'Farmer id must be valid' });
    }

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const deliveryDateInWeek =
      daysOfWeek.findIndex(day => day.toLowerCase() === body.delivery_date.toLowerCase()) !== -1;
    if (!deliveryDateInWeek) {
      return res.status(400).json({ data: 'Delivery date must be a day of a week' });
    }
    //store delivery_date as lowercase in db
    body.delivery_date = body.delivery_date.toLowerCase();

    body.subscription_frequency = parseInt(body.subscription_frequency);
    if (body.subscription_frequency !== 1) {
      return res.status(400).json({ data: 'Subscription frequency must be 1' });
    }

    //parse organic to boolean
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

    try {
      const { error } = await supabase.from('products').insert(body);
      if (error) {
        throw typeof error === 'string' ? new Error(error) : error;
      }
      return res.status(200).json({ data: 'Product created!' });
    } catch (error) {
      return res.status(500).json({ data: 'Internal Server Error.', error });
    }
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
