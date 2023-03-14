import formidable from 'formidable';
import path from 'path';
import fs from 'fs';
import { supabase } from '@/utils';

const uploadDir = path.join(process.cwd(), 'public/uploads/products');
const removeUploadedPhoto = photoFile => {
  fs.unlinkSync(`${uploadDir}/${photoFile}`);
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

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        status: 'fail',
        message: 'There was an error parsing the files',
        error: err,
      });
    }

    console.log('files', files);

    console.log('fields', fields);

    const newUserProfile = {
      firstname: fields.firstName.trim(),
      lastname: fields.lastName.trim(),
    };
    if (fields.farmerId) {
      const newFarmerProfile = {
        shop_name: fields.shopName.trim(),
        shop_description: fields.shopDescription.trim(),
      };

      // if user upload a new photo, add it to the query
      if (files && files['shopLogo']?.newFilename) {
        newFarmerProfile.shop_logo = files['shopLogo']?.newFilename;
      }
      const { error } = await supabase.from('farmers').update(newFarmerProfile).eq('id', fields.farmerId);
      if (error) {
        return res.status(500).json({ data: 'Internal server rrror' });
      }
      console.log('new farmer profile', newFarmerProfile);
    }

    console.log('new user profile', newUserProfile);

    const { error } = await supabase.from('profiles').update(newUserProfile).eq('id', fields.profileId);

    if (error) {
      return res.status(500).json({ data: 'Internal server rrror' });
    }

    return res.status(204).end();
  });
}
export const config = {
  api: {
    bodyParser: false,
  },
};
