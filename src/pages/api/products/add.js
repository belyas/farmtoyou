import { supabase } from '@/utils/supabaseClient';
import hasEmptyValue from '@/utils/hasEmptyValue';
import hasAllFields from '@/utils/hasAllFields';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import correctDBArray from '@/utils/isCorrectDBArrayFormat';
import farmerFound from '@/utils/findFarmerById';
import validDate from '@/utils/isValidDate';
import isoDate from '@/utils/isIsoDate';

export default async function add(req, res) {
  if (req.method != 'POST') {
    return res.status(405).json({ data: 'Request method must be POST.' });
  }

  const uploadDir = path.join(process.cwd(), 'src/assets/uploads/products');
  //if directory does not exist, create one
  if (!fs.existsSync(uploadDir)) {
    fs.mkdir(uploadDir, { recursive: true }, err => {
      if (err) throw err;
    });
  }

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

    const hasFile = hasEmptyValue(Object.keys(files));
    const hasPhoto = Object.keys(files).includes('photo');

    if (!hasFile || !hasPhoto) {
      return res.status(400).json({ data: 'Please upload a photo' });
    }

    const photo = files['photo'].newFilename;

    const product = {};

    product.photo = photo;

    const isEmptyBody = Object.keys(fields).length === 0 ? true : false;

    if (isEmptyBody) {
      return res.status(400).json({ data: 'Request body must not be empty' });
    }

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

    if (!hasAllFields(Object.keys(fields), formFields)) {
      return res.status(400).json({ data: 'Need to have all required fields.' });
    }

    const emptyValue = hasEmptyValue(Object.values(fields));

    if (emptyValue) {
      return res.status(400).json({ data: 'All fields must not be empty' });
    }

    //clean description, title and photo strings
    product.description = fields.description.trim();
    product.title = fields.title.trim();
    product.photo = fields.photo.trim();

    //check date is in ISO format && is in future &&  end>start
    if (!isoDate(fields.subscription_start) || isoDate(fields.subscription_end)) {
      return res.status(400).json({ data: 'Date must be in ISO format,e.g.,2023-01-01' });
    }
    const isValidDate = validDate(fields.subscription_start, fields.subscription_end);
    if (!isValidDate.valid) {
      return res.status(400).json({ data: isValidDate.message });
    }
    product.subscription_start = fields.subscription_start;
    product.subscription_end = fields.subscription_end;

    //check price and quantity are postive Int
    const priceIsPositiveInt = Math.sign(fields.price) === 1;
    const quantityIsPositiveInt = Math.sign(fields.quantity) === 1;

    if (!priceIsPositiveInt) {
      return res.status(400).json({ data: 'Price must be a positive integer' });
    }
    if (!quantityIsPositiveInt) {
      return res.status(400).json({ data: 'Quantity must be a positive integer' });
    }
    product.price = parseInt(fields.price);
    product.quantity = parseInt(fields.quantity);

    //check farmer exists in db and parse id into Int
    const farmerExists = await farmerFound(parseInt(fields.farmer_id));
    if (!farmerExists) {
      return res.status(400).json({ data: 'Farmer id must be valid' });
    }
    product.farmer_id = parseInt(fields.farmer_id);

    //check delivery date is within a day of a week and parse delivery_date to lowercase
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const deliveryDateInWeek =
      daysOfWeek.findIndex(day => day.toLowerCase() === fields.delivery_date.toLowerCase()) !== -1;
    if (!deliveryDateInWeek) {
      return res.status(400).json({ data: 'Delivery date must be a day of a week' });
    }
    product.delivery_date = fields.delivery_date.toLowerCase();

    if (parseInt(fields.subscription_frequency) !== 1) {
      return res.status(400).json({ data: 'Subscription frequency must be 1' });
    }
    product.subscription_frequency = parseInt(fields.subscription_frequency);

    //check if organic field is boolean and parse it to boolean
    if (fields.organic.toLowerCase() === 'true') {
      fields.organic = true;
    } else if (fields.organic.toLowerCase() === 'false') {
      fields.organic = false;
    } else {
      return res.status(400).json({ data: 'Organic field must provide a boolean value' });
    }
    product.organic = fields.organic;

    product.delivery_method = correctDBArray(fields.delivery_method)
      ? fields.delivery_method
      : '{' + fields.delivery_method + '}';
    product.category = correctDBArray(fields.category) ? fields.category : '{' + fields.category + '}';

    console.log(product);

    try {
      const { error } = await supabase.from('products').insert(product);
      if (error) {
        throw typeof error === 'string' ? new Error(error) : error;
      }
      return res.status(201).json({ data: 'Product created!' });
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
