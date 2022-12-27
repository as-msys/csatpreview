import { React, useEffect, useState } from "react";
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
  const [user, setUser] = useState("");
  const router = useRouter();

  const delay = "3000";

  const handleLogOut = () => {
    destroyCookie(null, "jwt");
    localStorage.removeItem("username");
    toast.success("Logged out Successfully!");
    window.setTimeout(function () {
      window.location = "/";
    }, delay);
  };

  useEffect(() => {
    // Perform localStorage action
    const username = localStorage.getItem("username");
    setUser(username);
  }, [user]);

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
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ display: "flex" }}>
              <PersonIcon />
              <Typography
                variant="subtitle1"
                sx={{
                  mb: 4,

                  px: 1,
                  fontWeight: "600",
                  color: "#000000",
                  fontSize: "16px",
                }}
              >
                {user}
              </Typography>
            </Box>
            <IconButton
              onClick={handleLogOut}
              sx={{
                mt: -1.5,
                ml: 10,
                color: "#000000",
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
