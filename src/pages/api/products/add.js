////be for product creation.
//-recieves input from creation form
//-validate the input
//-query database with POST request to create a new entry

import { supabase } from '../../../utils/supabaseClient';

const hasEmptyValue = array => {
  return array.find(item => item === undefined || item === '' || item === null);
};

export default async function add(req, res) {
  if (req.method === 'POST') {
    // Get data submitted in request's body.
    const body = req.body;

    console.log('body:', body);

    //if any of the filed is empty, return early
    if (hasEmptyValue(Object.values(body))) {
      res.status(400).json({ data: "Filed can't be empty" });
    } else {
      const { data, error } = await supabase
        .from('baskets')
        .insert([{ title: 'test' }])
        .select();
      if (!error) {
        res.status(200).json({ data: data });
      } else {
        res.status(500).json({ data: error });
      }
    }
  } else {
    return res.status(400).json({ data: 'Request method must be POST.' });
  }

  //insert data into database

  //respond with success msg
}
