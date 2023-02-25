import Button from '@mui/material/Button';

const AddToCartButton = () => {
  const handleClick = e => {
    console.log(e);
  };
  return (
    <Button
      variant="contained"
      onClick={e => {
        handleClick(e);
      }}
    >
      Add to cart
    </Button>
  );
};
export default AddToCartButton;
