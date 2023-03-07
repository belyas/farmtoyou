import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from 'next/link';

const categories = [
  'Bakery',
  'Meat',
  'Dairy',
  'Fruits',
  'Vegetables',
  'Flour',
  'Rice and pasta',
  'Oil',
  'Coffee and tea',
  'Wine and beer',
  'Salt and spices',
  'Seeds',
  'Beans and Legumes',
];

export default function CategoryList() {
  console.log(categories);
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {categories.map((category, index) => {
            return (
              <Link
                href={`/categories/${category.toLowerCase()}`}
                key={index}
              >
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText
                      primary={category}
                      value={category}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </nav>
      <Divider />
    </Box>
  );
}
