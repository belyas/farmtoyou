import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import CategoryList from './categoryList';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CategoryMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id="category-button"
        aria-controls={open ? 'category-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="text"
        onClick={handleClick}
        sx={{ my: 2, color: 'white' }}
      >
        Category
        <ExpandMoreIcon />
      </Button>
      <Menu
        id="category-menu"
        MenuListProps={{
          'aria-labelledby': 'category-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          style: {
            width: 600,
            overflowX: 'auto',
            overflowY: 'hidden',
          },
        }}
      >
        <CategoryList />
      </Menu>
    </>
  );
}
