"use client";
import React, { useState ,useEffect} from "react";
import { useTheme } from "@mui/material/styles";
import {useRouter} from "next/navigation";
import axios from "axios";
import {
  Box,
  Menu,
  Avatar,
  Typography,
  Divider,
  Button,
  IconButton,
  ListItemButton,
  List,
  ListItemText,
} from "@mui/material";

import {
  IconChevronDown,
  IconCreditCard,
  IconCurrencyDollar,
  IconShield,
} from "@tabler/icons-react";

const Profile = () => {
  const router = useRouter()
  const [userName, setUsrName] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const handleClick2 = (event: any) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const error = theme.palette.error.main;
  const errorlight = theme.palette.error.light;
  const success = theme.palette.success.main;
  const successlight = theme.palette.success.light;

  /*profile data*/
  const profiledata = [
    {
      href: "/",
      title: "My Profile",
      subtitle: "Account Settings",
      icon: <IconCurrencyDollar width="20" height="20" />,
      color: primary,
      lightcolor: primarylight,
    },
    {
      href: "/",
      title: "My Inbox",
      subtitle: "Messages & Emails",
      icon: <IconShield width="20" height="20" />,
      color: success,
      lightcolor: successlight,
    },
    {
      href: "/",
      title: "My Tasks",
      subtitle: "To-do and Daily Tasks",
      icon: <IconCreditCard width="20" height="20" />,
      color: error,
      lightcolor: errorlight,
    },
  ];
  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        router.push('/dashbord/login')
    } catch (error:any) {
        console.log(error.message);
    
    }
}
useEffect(() => {
 
  const getUserDetails = async () => {
    try {
      const res = await axios.get('/api/users/me');
      
      setUsrName(res.data.data.username);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Call the function to fetch user details when the component mounts.
  getUserDetails();
}, []); 
  return (
    <Box>
      <IconButton
        size="large"
        aria-label="menu"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === "object" && {
            borderRadius: "9px",
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={"/images/users/user2.jpg"}
          alt={"ProfileImg"}
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <Box
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            alignItems: "center",
          }}
        >
          <Typography
            color="textSecondary"
            variant="h5"
            fontWeight="400"
            sx={{ ml: 1 }}
          >
            Hi,
          </Typography>
          <Typography
            variant="h5"
            fontWeight="700"
            sx={{
              ml: 1,
            }}
          >
           {userName && <p>{userName}</p>}
          </Typography>
          <IconChevronDown width="20" height="20" />
        </Box>
      </IconButton>
      {/* ------------------------------------------- */}
      {/* Message Dropdown */}
      {/* ------------------------------------------- */}
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        sx={{
          "& .MuiMenu-paper": {
            width: "360px",
            p: 2,
            pb: 2,
            pt:0
          },
        }}
      >

        <Box pt={0}>

          <List>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Account" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="Change Password" />
            </ListItemButton>
            <ListItemButton component="a" href="#">
              <ListItemText primary="My Settings" />
            </ListItemButton>
          </List>

        </Box>
        <Divider />
        <Box mt={2}>
          <Button 
          onClick={logout}
          fullWidth variant="outlined" color="primary">
            Logout
          </Button>
        </Box>

      </Menu>
    </Box>
  );
};

export default Profile;
