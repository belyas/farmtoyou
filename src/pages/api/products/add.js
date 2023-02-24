import { supabase } from '@/utils/supabaseClient';
import hasEmptyValue from '@/utils/hasEmptyValue';
import hasAllFields from '@/utils/hasAllFields';
import formidable from 'formidable';
import path from 'path';
import cleanData from '@/utils/cleanProductData';
import fs from 'fs';

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

    cleanData(body, res);

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
