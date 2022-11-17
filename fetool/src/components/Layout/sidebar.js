import React from "react";
import { Drawer, Box, Typography } from "@mui/material";
import Header from "../Header";
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

const drawerWidth = "15rem"; //240px/8=15rem

const Sidebar = ({ children }) => {
  const router = useRouter();
  const styles = {
    width: drawerWidth, //separating children from the sidebar component in a layout
    "& .MuiDrawer-paper": {
      width: drawerWidth, //sidebar width
      boxSizing: "border-box",
    },
  };

  const StyledList = styled(List)({
    // selected and (selected + hover) states
    "&& .Mui-selected, && .Mui-selected:hover": {
      backgroundColor: "#303f9f",
      "&, & .MuiListItemIcon-root": {
        color: "white",
      },
    },
    // hover states
    "& .MuiListItemButton-root:hover": {
      backgroundColor: "primary",
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
      path: "/accounts",
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
        <>
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
              <Header />
            </div>
            <StyledList>
              {menuItems?.map((item) => (
                <ListItemButton
                  selected={router.pathname === item.path ? true : false}
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
                bottom: "10%",
                display: "flex",
              }}
            >
              <PersonIcon sx={{ ml: 1 }} />
              <Typography
                variant="subtitle1"
                style={{ marginRight: "5rem", marginLeft: "0.5rem" }}
              >
                Manager
              </Typography>
              <IconButton>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Drawer>
          <footer
            style={{
              backgroundColor: "#616161",
              position: "fixed",
              bottom: "0",
              right: "0",
              width: "100%",
              textAlign: "center",
              color: "white",
            }}
          >
            ©2022 MSys Technologies
          </footer>
        </>
      )}
      <Box sx={{ width: "100%", height: "100vh" }}>{children}</Box>
    </Box>
  );
};

export default Sidebar;
