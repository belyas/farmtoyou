import { supabase } from '../../../utils/supabaseClient';


export default async function payment(req, res) {

  try {
    const  paymentData  = req.body

    const { data, error } = await supabase
      .from('payments')
      .select()
      .eq('profile_id', paymentData.profile_id)

      if(data && data.length > 0){
        paymentData.id = data[0].id
      }


    const result = await supabase
      .from('payments')
      .upsert({
        id: paymentData.id,
        created_at: new Date(),
        card_holder: paymentData.card_holder,
        card_number: paymentData.card_number,
        card_cvv:   paymentData.card_cvv,
        // expiration_date: paymentData.expiration_date,
        expiration_date: getExpirationDate(paymentData.expiration_date),
        profile_id: paymentData.profile_id
      },
        { onConflict: 'id', returning: 'minimal' }
      )
    if (error) {
      throw error
    }
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }


}



export const getExpirationDate = (dateString) => {
 const splittedDate = dateString.split('-');
 const date = new Date();
 date.setDate(1)
 date.setMonth(splittedDate[0])
 date.setYear(splittedDate[1])
 return date;
}