import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CategoryMenu from './categoryMenu';
import { useState } from 'react';

export default function CategoryDrawer() {
  const [open, setOpen] = useState(false);
  console.log('is open', open);

  const toggleDrawer = () => {
    setOpen(open => !open);
  };

  const List = () => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
    >
      <Button
        variant="text"
        onClick={toggleDrawer}
      >
        Close
      </Button>
      <CategoryMenu />
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <Button onClick={toggleDrawer}>category</Button>
        <Drawer
          anchor="left"
          open={open}
          onClose={toggleDrawer}
        >
          <List />
        </Drawer>
      </React.Fragment>
    </div>
  );
}
