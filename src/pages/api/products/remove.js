import { existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const uploadDir = join(process.cwd(), 'public/uploads/products');

export default async function remove(req, res, supabase) {
  if (req.method == 'DELETE') {
    const { id: productId, photo } = req.query;

    if (!productId) {
      return res.status(400).json({ data: 'product id was missing' });
    }

    const { error } = await supabase.from('products').delete().eq('id', productId);

    if (error) {
      return res.status(500).json({ error });
    }

    if (existsSync(join(uploadDir, photo))) {
      unlinkSync(join(uploadDir, photo));
    }

    return res.status(204).json({ seccess: true });
  }
}
