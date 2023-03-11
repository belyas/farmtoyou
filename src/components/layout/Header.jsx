// import Link from 'next/link';
// import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
// import { useRouter } from 'next/router';
// import Button from '@mui/material/Button';
// import ShoppingCart from '@/components/cart/shoppingCart';
// import Avatar from '@mui/material/Avatar';
// import { useState } from 'react';
// import Box from '@mui/material/Box';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';
// <<<<<<< HEAD

// const pages = ['Products', 'Contact us', 'About us', 'Blog', 'Orders', 'Cateogries'];
// =======
// import CategoryMenu from '../categoryMenu';

// const pages = ['Products', 'Contact us', 'About us', 'Orders'];
// >>>>>>> 228ebb454106687713ce29c51be5af056dce59b2
// const settings = ['Profile'];

// export const Header = () => {
//   const session = useSession();
//   const route = useRouter();
//   const supabase = useSupabaseClient();
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);

//   const handleOpenNavMenu = event => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = event => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <AppBar
//       position="static"
//       sx={{ mb: 2 }}
//     >
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
//           <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               textDecoration: 'none',
//             }}
//           >
//             FARMTOYOU
//           </Typography>

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map(page => (
//                 <MenuItem
//                   key={page}
//                   onClick={() => {
//                     handleCloseNavMenu();
//                     route.push(`/${page.toLowerCase().replace(/\s/g, '-')}`);
//                   }}
//                 >
//                   <Typography textAlign="center">{page}</Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>
//           <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
//           <Typography
//             variant="h5"
//             noWrap
//             component="a"
//             href=""
//             sx={{
//               mr: 2,
//               display: { xs: 'flex', md: 'none' },
//               flexGrow: 1,
//               fontFamily: 'monospace',
//               fontWeight: 700,
//               letterSpacing: '.3rem',
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             FARMTOYOU
//           </Typography>
//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map(page => (
//               <Button
//                 key={page}
//                 onClick={() => {
//                   handleCloseNavMenu();
//                   route.push(`/${page.toLowerCase().replace(/\s/g, '-')}`);
//                 }}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 {page}
//               </Button>
//             ))}
// <<<<<<< HEAD
//           </Box>
//           <ShoppingCart />

//           <Box sx={{ flexGrow: 0 }}>
// =======
//             <CategoryMenu />
//           </Box>

//           <Box sx={{ flexGrow: 0 }}>
//             <ShoppingCart />
// >>>>>>> 228ebb454106687713ce29c51be5af056dce59b2
//             {session ? (
//               <>
//                 <Tooltip title="Open settings">
//                   <IconButton
//                     onClick={handleOpenUserMenu}
//                     sx={{ p: 0 }}
//                   >
//                     <Avatar alt="FARMTOYOU" />
//                   </IconButton>
//                 </Tooltip>
//                 <Menu
//                   sx={{ mt: '45px' }}
//                   id="menu-appbar"
//                   anchorEl={anchorElUser}
//                   anchorOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                   keepMounted
//                   transformOrigin={{
//                     vertical: 'top',
//                     horizontal: 'right',
//                   }}
//                   open={Boolean(anchorElUser)}
//                   onClose={handleCloseUserMenu}
//                 >
//                   {settings.map(setting => (
//                     <MenuItem
//                       key={setting}
//                       onClick={() => {
//                         handleCloseUserMenu();
//                         route.push(`/${setting.toLowerCase().replace(/\s/g, '-')}`);
//                       }}
//                     >
//                       <Typography textAlign="center">{setting}</Typography>
//                     </MenuItem>
//                   ))}
//                   <MenuItem
//                     onClick={async () => {
//                       await supabase.auth.signOut();
//                       route.push('/');
//                     }}
//                   >
//                     <Typography textAlign="center">Logout</Typography>
//                   </MenuItem>
//                 </Menu>
//               </>
//             ) : (
//               <Button
//                 onClick={() => {
//                   route.push('/login');
//                 }}
//                 sx={{ my: 2, color: 'white', display: 'block' }}
//               >
//                 Login
//               </Button>
//             )}
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// };
import Link from 'next/link';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import ShoppingCart from '@/components/cart/shoppingCart';
import Avatar from '@mui/material/Avatar';
import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import CategoryMenu from '../categoryMenu';

const pages = ['Products', 'Contact us', 'About us', 'Orders'];
const settings = ['Profile'];

export const Header = () => {
  const session = useSession();
  const route = useRouter();
  const supabase = useSupabaseClient();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = event => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
console.log()
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ mb: 2 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
            }}
          >
            FARMTOYOU
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map(page => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    route.push(`/${page.toLowerCase().replace(/\s/g, '-')}`);
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FARMTOYOU
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(page => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  route.push(`/${page.toLowerCase().replace(/\s/g, '-')}`);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
            <CategoryMenu />
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <ShoppingCart />
            {session ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0 }}
                  >
                    <Avatar alt="FARMTOYOU" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map(setting => (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        handleCloseUserMenu();
                        route.push(`/${setting.toLowerCase().replace(/\s/g, '-')}`);
                      }}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                  <MenuItem
                    onClick={async () => {
                      await supabase.auth.signOut();
                      route.push('/');
                    }}
                  >
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Button
                onClick={() => {
                  route.push('/login');
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
