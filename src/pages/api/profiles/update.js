import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import { supabase } from '@/utils';

const uploadDir = path.join(process.cwd(), 'public/uploads/profiles');

const removeUploadedPhoto = photoFile => {
  fs.unlinkSync(`${uploadDir}/${photoFile}`);
};

const hasPhoto = photoName => {
  const find = fs.existsSync(`${uploadDir}/${photoName}`);
  return find;
};

export default async function update(req, res) {
  if (req.method !== 'PUT') {
    return res.status(400).json({ data: 'Request method must be put.' });
  }

  //if directory does not exist, create one
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }, err => {
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

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      return res.status(400).json({
        status: 'fail',
        message: 'There was an error parsing the files',
        error: err,
      });
    }

    const newShopLogo = files['shopLogo']?.newFilename;

    const isEmptyBody = Object.keys(_fields).length === 0 ? true : false;

    if (isEmptyBody) {
      console.log(1);
      newShopLogo && removeUploadedPhoto(newShopLogo);
      return res.status(400).json({ data: 'Request body must not be empty' });
    }

    const { oldShopLogo, shopLogo, ...fields } = _fields;

    const newUserProfile = {
      firstname: fields.firstName.trim(),
      lastname: fields.lastName.trim(),
    };

    //update user profile
    const { error } = await supabase.from('profiles').update(newUserProfile).eq('id', fields.profileId);
    if (error) {
      return res.status(500).json({ data: 'Internal server rrror', error });
    }

    //if user is farmer, also update shop
    if (fields.farmerId) {
      const newFarmerProfile = newShopLogo ? { shop_logo: newShopLogo } : {};

      newFarmerProfile.shop_name = fields.shopName.trim();
      newFarmerProfile.shop_description = fields.shopDescription.trim();

      const { error } = await supabase.from('farmers').update(newFarmerProfile).eq('id', fields.farmerId);

      if (error) {
        newShopLogo && removeUploadedPhoto(newShopLogo);
        return res.status(500).json({ data: 'Internal server rrror', error });
      }

      if (oldShopLogo && hasPhoto(oldShopLogo)) {
        removeUploadedPhoto(oldShopLogo);
      }
    }

    return res.status(201).json({ data: 'Product updated!' });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
