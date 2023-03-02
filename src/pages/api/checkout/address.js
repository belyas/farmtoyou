import { supabase } from '../../../utils/supabaseClient';


export default async function address(req, res) {
    try {
        const addressDetail = req.body


        const { data, error } = await supabase
            .from('addresses')
            .select()
            .eq('profile_id', addressDetail.profile_id)

            if(data && data.length>0){
                console.log(data)

                addressDetail.id = data[0].id
            }


        const  result = await supabase
            .from('addresses')
            .upsert({
                id: addressDetail.id,
                created_at: new Date(),
                profile_id: addressDetail.profile_id,
                address_1: addressDetail.address_1,
                address_2: addressDetail.address_2,
                country: addressDetail.country,
                city: addressDetail.city,
                province: addressDetail.province,
                code_postal: addressDetail.code_postal,
                phone: addressDetail.phone,
                firstname: addressDetail.firstname,
                lastname: addressDetail.lastname
            },
                { onConflict: 'id', returning: 'minimal' }
            )
        if (error) {
            console.log(error)
        } else {
            res.status(200).json({ success: true, data })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }

}





