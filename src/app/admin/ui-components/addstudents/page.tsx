"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { IconFileUpload } from "@tabler/icons-react";
import {
  Grid,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import BaseCard from "@/app/admin/components/shared/BaseCard";

import { result } from "lodash";
const Forms = () => {
  const [courseName, setCourseName] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true); // Initialize as true
  const [csvFile, setCsvFile] = useState<File | undefined>();


  const handleSubmit = async () => {
    if (!csvFile || !courseName) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("courseName", courseName);
      formData.append("csvFile", csvFile);

      const response = await axios.post("/api/upload/addStudents", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set the content type for FormData
        },
      });

      if (response.status === 200) {
        setCourseName("");
        setCsvFile(undefined);
        toast.success("Students added successfully!");
      } else {
        toast.error("Error adding students.");
      }
    } catch (error) {
      toast.error("An error occurred while adding students.");
      console.error(error);
    }
  };

  useEffect(() => {
    // Enable the button only when both courseName and csvFile are filled
    if (courseName.length > 0 && csvFile) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [courseName, csvFile]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <BaseCard title="Insert Student DB">
            <>
              <Stack spacing={3}>
                <TextField
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  id="name-basic"
                  label="Course Name"
                  variant="outlined"
                  required
                />
                <Typography variant="subtitle1" color="textSecondary">
                  *The CSV File Header Should look like (name,email,rollNo)
                </Typography>
                <label htmlFor="file-input">
                  <input
                    type="file"
                    id="file-input"
                    accept=".csv"
                    style={{ display: "none" }}
                    onChange={(e) => setCsvFile(e.target.files?.[0])}
                  />
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<IconFileUpload />}
                  >
                    Select CSV File
                  </Button>
                </label>
              </Stack>
              <br />
              <Button
                color="secondary"
                size="large"
                variant="outlined"
                disabled={buttonDisabled}
                onClick={handleSubmit}
              >
                {buttonDisabled ? "Fill in Fields" : "Add Students from CSV"}
              </Button>
            </>
          </BaseCard>
        </Grid>
      </Grid>
    </>
  );
};

export default Forms;
