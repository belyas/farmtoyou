import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

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

function CategoryListParts({ c }) {
  return (
    <Box sx={{ width: '100%', maxWidth: 540, bgcolor: 'background.paper' }}>
      <Grid
        container
        spacing={2}
      >
        <List>
          {c.map((category, index) => {
            return (
              <Link
                href={`/categories/${category.toLowerCase()}`}
                key={index}
                className="nextjs-link"
              >
                <ListItem
                  disablePadding
                  sx={{ whiteSpace: 'nowrap' }}
                >
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
      </Grid>
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function CategoryList() {
  return (
    <Box sx={{ flexGrow: 1, overflowX: 'auto', overflowY: 'hidden' }}>
      <Grid
        container
        spacing={1}
      >
        <Grid xs={4}>
          <Item sx={{ boxShadow: '0 0 0 0 ' }}>
            <CategoryListParts c={categories.slice(0, 4)} />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item sx={{ boxShadow: '0 0 0 0 ' }}>
            <CategoryListParts c={categories.slice(4, 8)} />
          </Item>
        </Grid>
        <Grid xs={4}>
          <Item sx={{ boxShadow: '0 0 0 0 ' }}>
            <CategoryListParts c={categories.slice(8)} />
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
