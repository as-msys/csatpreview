import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import LogoHeader from "../LogoHeader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FolderIcon from "@mui/icons-material/Folder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import NotificationsIcon from "@mui/icons-material/Notifications";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import Router from "next/router";
import PersonIcon from "@mui/icons-material/Person";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { toast } from "react-toastify";

const drawerWidth = "17rem"; //240px/8=15rem

const Sidebar = ({ children }) => {
  const router = useRouter();

  const delay = "3000";

  const handleLogOut = () => {
    destroyCookie(null, "jwt");
    toast.success("Logged out Successfully!");
    window.setTimeout(function () {
      window.location = "/";
    }, delay);
  };

  const styles = {
    width: drawerWidth,
    "& .MuiDrawer-paper": {
      width: drawerWidth,
      boxSizing: "border-box",
    },
  };

  const StyledList = styled(List)({
    // selected and (selected + hover) states
    "&& .Mui-selected, && .Mui-selected:hover": {
      backgroundColor: "#4153AF",
      "&, & .MuiListItemIcon-root": {
        color: "white",
      },
      "&, & .MuiSvgIcon-root": {
        color: "white",
      },
    },
  });

  const menuItems = [
    {
      text: "Dashboard",
      icon: <DashboardIcon color="neutral" />,
      path: "/dashboard",
    },
    {
      text: "Accounts",
      icon: <FolderIcon color="neutral" />,
      path: "/Accounts",
    },
    {
      text: "Surveys",
      icon: <StarHalfIcon color="neutral" />,
      path: "/surveys",
    },
    {
      text: "Notifications",
      icon: <NotificationsIcon color="neutral" />,
      path: "/notifications",
    },
  ];

  return (
    <Box style={{ display: "flex" }}>
      {/* conditional rendering of drawer */}
      {children.type.name !== "Home" && (
        <Drawer
          variant="permanent"
          anchor="left"
          sx={{ ...styles }}
          PaperProps={{
            sx: {
              backgroundColor: "#F5F7FF",
            },
          }}
        >
          <div style={{ margin: "1rem" }}>
            <LogoHeader />
          </div>
          <StyledList>
            {menuItems?.map((item) => (
              <ListItemButton
                selected={router.pathname.includes(item.path) ? true : false}
                key={item.text}
                onClick={() => {
                  Router.push(item.path);
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText sx={{ ml: -2.5 }}>{item.text}</ListItemText>
              </ListItemButton>
            ))}
          </StyledList>
          <Box
            style={{
              position: "fixed",
              bottom: "1%",
              margin: "1rem",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <PersonIcon sx={{ mt: 0, ml: 1 }} />
            <Typography variant="subtitle1" sx={{ mb: 4, px: 1 }}>
              Manager
            </Typography>
            <IconButton
              onClick={handleLogOut}
              sx={{
                ml: "4rem",
                mt: -1.5,
                width: "50px",
                height: "50px",
              }}
            >
              <LogoutIcon />
            </IconButton>
          </Box>

          <footer className="footerClass">© 2022 MSys Technologies</footer>
        </Drawer>
      )}
      <Box sx={{ width: "100%", height: "100vh" }}>{children}</Box>
    </Box>
  );
};

export default Sidebar;
