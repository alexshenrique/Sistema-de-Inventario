import React, { useState, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Avatar,
  Tooltip,
  Breadcrumbs,
  Link as MuiLink
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const menu = [
  { label: "Início", href: "/dashboard", icon: <HomeIcon /> },
  { label: "Equipamentos", href: "/equipamentos", icon: <DevicesIcon /> },
  { label: "Usuários", href: "/usuarios", icon: <PeopleIcon /> },
  { label: "Manutenções", href: "/manutencoes", icon: <BuildIcon /> },
  { label: "Relatórios", href: "/dashboards", icon: <BarChartIcon /> },
];

function getBreadcrumbs(location, navigate) {
  const pathnames = location.pathname.split("/").filter((x) => x);
  const crumbs = [
    { label: "Equipamentos", href: "/" },
    ...pathnames.map((name) => {
      const menuItem = menu.find((m) => m.href.replace("/", "") === name);
      return menuItem
        ? { label: menuItem.label, href: menuItem.href }
        : { label: name.charAt(0).toUpperCase() + name.slice(1), href: `/${name}` };
    }),
  ];
  // Remover duplicatas (ex: se já está em /)
  return crumbs.filter((c, i, arr) => arr.findIndex(x => x.href === c.href) === i);
}

const Layout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleMenuClick = (href) => {
    navigate(href);
    setDrawerOpen(false);
  };

  const breadcrumbs = getBreadcrumbs(location, navigate);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2", // azul
      },
      secondary: {
        main: "#43a047", // verde
      },
    },
    typography: {
      fontFamily: 'Roboto, Arial, sans-serif',
    },
  }), [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Sistema de Equipamentos
          </Typography>
          {/* Menu superior para telas médias/grandes */}
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {menu.map((item) => (
              <Button
                key={item.label}
                color={location.pathname === item.href ? "secondary" : "inherit"}
                onClick={() => handleMenuClick(item.href)}
                startIcon={item.icon}
                sx={{ ml: 1 }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
          {/* Botão de alternância de tema */}
          <Tooltip title={darkMode ? "Tema claro" : "Tema escuro"}>
            <IconButton color="inherit" onClick={() => setDarkMode((d) => !d)} sx={{ ml: 2 }}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
          {/* Avatar do usuário no canto direito */}
          <Box sx={{ ml: 2 }}>
            <Tooltip title="Perfil do usuário">
              <IconButton color="inherit">
                <Avatar sx={{ bgcolor: "secondary.main" }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Breadcrumbs */}
      <Box sx={{ px: 2, py: 1, background: darkMode ? "#23272b" : "#e3eaf2" }}>
        <Breadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((crumb, idx) => (
            idx < breadcrumbs.length - 1 ? (
              <MuiLink
                key={crumb.href}
                color="inherit"
                underline="hover"
                onClick={() => handleMenuClick(crumb.href)}
                sx={{ cursor: "pointer" }}
              >
                {crumb.label}
              </MuiLink>
            ) : (
              <Typography key={crumb.href} color="text.primary">
                {crumb.label}
              </Typography>
            )
          ))}
        </Breadcrumbs>
      </Box>
      {/* Drawer para telas pequenas */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: "block", sm: "none" } }}
      >
        <Box sx={{ width: 240 }} role="presentation" onClick={handleDrawerToggle}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Menu
          </Typography>
          <Divider />
          <List>
            {menu.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton onClick={() => handleMenuClick(item.href)} selected={location.pathname === item.href}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ background: darkMode ? "#181a1b" : "#f5f5f5", minHeight: "100vh", py: 4, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Container maxWidth="lg" sx={{ flex: 1 }}>
          <Outlet />
        </Container>
        {/* Rodapé */}
        <Box component="footer" sx={{ mt: 4, py: 2, textAlign: 'center', color: darkMode ? '#bbb' : '#555', background: 'transparent', fontSize: 14 }}>
          Sistema de Equipamentos &copy; {new Date().getFullYear()} &mdash; Desenvolvido por Alex Silva
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Layout; 