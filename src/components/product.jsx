// import Grid from '@mui/material/Unstable_Grid2';
// import Image from 'next/image';
// import Typography from '@mui/material/Typography';
// import AddToCartButton from './cart/addToCartButton';
// import SelectProductQuantity from './elements/selectProductQuantity';
// import { useState } from 'react';

// const Product = ({ product }) => {
//   const [quantity, SetQuantity] = useState(1);

//   return (
//     <Grid
//       container
// <<<<<<< HEAD
//       // spacing={2}
// =======
// >>>>>>> 228ebb454106687713ce29c51be5af056dce59b2
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Grid
//         xs={12}
//         md={6}
//       >
// <<<<<<< HEAD
//         {product.photo && product.photo.endsWith('.jpg') ? (
//           <Image
//             src={`/uploads/products/${product.photo}`}
//             title="placeholder veggie-basket"
//             height={300}
//             width={300}
//             alt={product.title}
//           />
//         ) : (
//           <Image
//             src="/images/default-veggie.jpg"
//             title="placeholder veggie-basket"
//             alt="placeholder veggie-basket"
//             height={300}
//             width={300}
//           />
//         )}
//       </Grid>
//       <Grid
//         xs={12}
//         md={6}
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Typography
//           gutterBottom
//           variant="h3"
//         >
//           {product.title}
//         </Typography>
//         <Typography
//           gutterBottom
//           variant="h5"
//         >
//           € {product.price}
//         </Typography>
//         <Typography
//           gutterBottom
//           variant="subtitle1"
//         >
//           {product.description}
//         </Typography>
//         <SelectProductQuantity
//           stock={product.quantity}
//           setQuantity={SetQuantity}
//           quantity={quantity}
//         />
//         <AddToCartButton
//           product={product}
//           quantity={quantity}
//         />
//       </Grid>
// =======
//         <div
//           className="next-image-wrapper"
//           style={{ position: 'relative' }}
//         >
//           {product.photo && product.photo.endsWith('.jpg') ? (
//             <Image
//               src={`/uploads/products/${product.photo}`}
//               title="placeholder veggie-basket"
//               fill={true}
//               alt={product.title}
//               style={{ objectFit: 'cover' }}
//             />
//           ) : (
//             <Image
//               src="/images/default-veggie.jpg"
//               title="placeholder veggie-basket"
//               alt="placeholder veggie-basket"
//               fill={true}
//               style={{ objectFit: 'cover' }}
//             />
//           )}
//         </div>
//       </Grid>
//       <Grid
//         xs={12}
//         md={6}
//         justifyContent="center"
//         alignItems="center"
//       >
//         <Grid xs={12}>
//           <Typography
//             gutterBottom
//             variant="h3"
//           >
//             {product.title}
//           </Typography>
//         </Grid>

//         <Grid xs={12}>
//           <Typography
//             gutterBottom
//             variant="h5"
//           >
//             € {product.price}
//           </Typography>
//         </Grid>

//         <Grid xs={12}>
//           <Typography
//             gutterBottom
//             variant="subtitle1"
//           >
//             {product.description}
//           </Typography>
//         </Grid>

//         <Grid xs={12}>
//           <Grid
//             xs={12}
//             sx={{ pb: 2 }}
//           >
//             <SelectProductQuantity
//               stock={product.quantity}
//               setQuantity={SetQuantity}
//               quantity={quantity}
//             />
//           </Grid>
//           <Grid>
//             <AddToCartButton
//               product={product}
//               quantity={quantity}
//             />
//           </Grid>
//         </Grid>
//       </Grid>
// >>>>>>> 228ebb454106687713ce29c51be5af056dce59b2
//     </Grid>
//   );
// };

// export default Product;
import Grid from '@mui/material/Unstable_Grid2';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import AddToCartButton from './cart/addToCartButton';
import SelectProductQuantity from './elements/selectProductQuantity';
import { useState } from 'react';

const Product = ({ product }) => {
  const [quantity, SetQuantity] = useState(1);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
    >
      <Grid
        xs={12}
        md={6}
      >
        <div
          className="next-image-wrapper"
          style={{ position: 'relative' }}
        >
          {product.photo && product.photo.endsWith('.jpg') ? (
            <Image
              src={`/uploads/products/${product.photo}`}
              title="placeholder veggie-basket"
              fill={true}
              alt={product.title}
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <Image
              src="/images/default-veggie.jpg"
              title="placeholder veggie-basket"
              alt="placeholder veggie-basket"
              fill={true}
              style={{ objectFit: 'cover' }}
            />
          )}
        </div>
      </Grid>
      <Grid
        xs={12}
        md={6}
        justifyContent="center"
        alignItems="center"
      >
        <Grid xs={12}>
          <Typography
            gutterBottom
            variant="h3"
          >
            {product.title}
          </Typography>
        </Grid>

        <Grid xs={12}>
          <Typography
            gutterBottom
            variant="h5"
          >
            € {product.price}
          </Typography>
        </Grid>

        <Grid xs={12}>
          <Typography
            gutterBottom
            variant="subtitle1"
          >
            {product.description}
          </Typography>
        </Grid>

        <Grid xs={12}>
          <Grid
            xs={12}
            sx={{ pb: 2 }}
          >
            <SelectProductQuantity
              stock={product.quantity}
              setQuantity={SetQuantity}
              quantity={quantity}
            />
          </Grid>
          <Grid>
            <AddToCartButton
              product={product}
              quantity={quantity}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Product;
