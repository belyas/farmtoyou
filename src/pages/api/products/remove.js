import { supabase } from '../../../utils/supabaseClient';

export default async function remove(req, res) {
	if (req.method == 'DELETE') {
		const { data, error } = await supabase
			.from('products')
		 	.delete()
		 	.eq('id', req.query.id)
		return res.status(200).json({ data, error })
	}
}