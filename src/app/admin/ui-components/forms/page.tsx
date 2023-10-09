'use client';
import {
    Paper,
    Grid,
    Stack,
    TextField,
    Checkbox,
    FormGroup,
    FormControlLabel,
    Button,
} from '@mui/material'
import BaseCard from '@/app/admin/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import React, { useState,useEffect } from "react";
import axios from "axios";
import { toast,Toaster } from "react-hot-toast";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body1,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
  }));
  
const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


const Forms = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const addTeacher = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/addteacher", user);
      console.log("Added Teacher Success", response.data);

      // Clear the form fields
      setUser({
        email: "",
        password: "",
        username: "",
      });

      toast.success('Successfully added!')
    } catch (error:any) {
      console.error("Failed!!!!! ", error.message);

      // Display an error toast message
      toast.error("Failed to add teacher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Insert Teacher">
          <>
            <Stack spacing={3}>
              <TextField
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                id="name-basic"
                label="Name"
                variant="outlined"
                required
              />
              <TextField
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                id="email-basic"
                label="Email"
                variant="outlined"
                required
              />
              <TextField
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                id="pass-basic"
                label="Password"
                type="password"
                variant="outlined"
                required
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Terms & Condition"
                  required
                />
              </FormGroup>
            </Stack>
            <br />
            <Button
              color="secondary"
              size="large"
              variant="outlined"
              onClick={addTeacher}
              disabled={buttonDisabled}
            >
              {buttonDisabled ? "Something Is Missing" : "Add Teacher"}
            </Button>
          </>
        </BaseCard>
      </Grid>
    </Grid>
    </>
  );
};

export default Forms;

  {/* <Grid item xs={12} lg={12}>
          <BaseCard title="Form Design Type">
            <Stack spacing={3} direction="row">
              <TextField
                id="outlined-basic"
                label="Outlined"
                variant="outlined"
              />
              <TextField id="filled-basic" label="Filled" variant="filled" />
              <TextField
                id="standard-basic"
                label="Standard"
                variant="standard"
              />
            </Stack>
          </BaseCard>
        </Grid> */}