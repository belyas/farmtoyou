import hasEmptyValue from '@/utils/hasEmptyValue';
import hasAllFields from '@/utils/hasAllFields';
import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import correctDBArray from '@/utils/isCorrectDBArrayFormat';
import farmerFound from '@/utils/findFarmerById';
import { isInFuture } from '@/utils/isValidDate';
import isoDate from '@/utils/isIsoDate';
import { supabase } from '@/utils';

const uploadDir = path.join(process.cwd(), 'public/uploads/products');
const removeUploadedPhoto = photoFile => {
  fs.unlinkSync(`${uploadDir}/${photoFile}`);
};

const hasPhoto = photoName => {
  const find = fs.existsSync(`${uploadDir}/${photoName}`);
  return find;
};

export default async function update(req, res) {
  //if directory does not exist, create one
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }, err => {
      if (err) throw err;
    });
  }

  const form = formidable({
    allowEmptyFiles: true,
    maxFiles: 1,
    maxFileSize: 1 * 1024 * 1024,
    uploadDir,
    filename: (_name, _ext, part) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      return `${part.name || 'unknown'}-${uniqueSuffix}.jpg`; // we can improve the extension part, but for now jpg is okay
    },
  });

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(400).json({
        status: 'fail',
        message: 'There was an error parsing the files',
        error: err,
      });
    }

    const newPhoto = files['photo']?.newFilename;

    const isEmptyBody = Object.keys(_fields).length === 0 ? true : false;

    if (isEmptyBody) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Request body must not be empty' });
    }

    const { oldphoto, id, photo, ...fields } = _fields;

    const product = newPhoto ? { photo: newPhoto } : {};

    //Need to have all required fields
    const formFields = [
      'farmer_id',
      'title',
      'price',
      'delivery_date',
      'subscription_frequency',
      'subscription_end',
      'organic',
      'category',
      'description',
      'quantity',
      'delivery_method',
    ];

    if (!hasAllFields(Object.keys(fields), formFields)) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Need to have all required fields.' });
    }

    const emptyValue = hasEmptyValue(Object.values(fields));

    if (emptyValue) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'All fields must not be empty' });
    }

    //clean description, title and photo strings
    product.description = fields.description.trim();
    product.title = fields.title.trim();

    //check date is in ISO format && is in future &&  end>start
    if (!isoDate(fields.subscription_end)) {
      newPhoto && removeUploadedPhoto(newPhoto);

      return res.status(400).json({ data: 'Date must be in ISO format,e.g.,2023-01-01' });
    }
    const isValidDate = isInFuture(fields.subscription_end);

    if (!isValidDate) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: isValidDate.message });
    }

    product.subscription_end = fields.subscription_end;

    //check price and quantity are postive Int
    const priceIsPositiveInt = Math.sign(fields.price) === 1;
    const quantityIsPositiveInt = Math.sign(fields.quantity) === 1;

    if (!priceIsPositiveInt) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Price must be a positive integer' });
    }
    if (!quantityIsPositiveInt) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Quantity must be a positive integer' });
    }
    product.price = parseInt(fields.price);
    product.quantity = parseInt(fields.quantity);

    //check farmer exists in db and parse id into Int
    const farmerExists = await farmerFound(parseInt(fields.farmer_id));
    if (!farmerExists) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Farmer id must be valid' });
    }
    product.farmer_id = parseInt(fields.farmer_id);

    //check delivery date is within a day of a week and parse delivery_date to lowercase
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const deliveryDateInWeek =
      daysOfWeek.findIndex(day => day.toLowerCase() === fields.delivery_date.toLowerCase()) !== -1;
    if (!deliveryDateInWeek) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Delivery date must be a day of a week' });
    }
    product.delivery_date = fields.delivery_date.toLowerCase();

    if (parseInt(fields.subscription_frequency) !== 1) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Subscription frequency must be 1' });
    }
    product.subscription_frequency = parseInt(fields.subscription_frequency);
    product.organic = fields.organic;

    if (Number.isNaN(parseInt(fields.delivery_method))) {
      newPhoto && removeUploadedPhoto(newPhoto);
      return res.status(400).json({ data: 'Choose a delivery method' });
    }

    product.delivery_method = parseInt(fields.delivery_method);
    product.category = correctDBArray(fields.category) ? fields.category : '{' + fields.category + '}';

    try {
      const { error } = await supabase.from('products').update(product).eq('id', id);
      if (error) {
        throw typeof error === 'string' ? new Error(error) : error;
      }

      if (newPhoto && oldphoto && hasPhoto(oldphoto)) {
        removeUploadedPhoto(oldphoto);
      }

      return res.status(201).json({ data: 'Product updated!' });
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
