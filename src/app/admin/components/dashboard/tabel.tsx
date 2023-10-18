interface Teacher {
  email: string;
  username: string;
}
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import { IconTrash, IconEdit } from "@tabler/icons-react";
import axios from 'axios';
import toast from 'react-hot-toast/headless';
import { Toaster } from 'react-hot-toast';



const TeacherPerfomance = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
 
  const [teacherToDelete, setTeacherToDelete] = useState({email: ""});
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    // Fetch data from the MongoDB collection (replace with your API endpoint)
    axios.get('/api/getData/teachers') 
      .then((response) => {
        setTeachers(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);



  const handleDeleteClick = (teacher:any) => {
    setTeacherToDelete({email:teacher.email});
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async() => {

    const response = await axios.post("/api/delete/deleteTeacher",teacherToDelete);
    if(response.data){
      setIsDeleteDialogOpen(false);
      setTeacherToDelete({email:""});
      toast.success("Teacher Delete Successfully!!")
      window.location.reload();
     }
     else{
      toast.error("Somthibg Went Wrong!!!")
     } 
    
  };
  

  const handleCancelDelete = () => {
    // Cancel the delete action and close the delete dialog
    setIsDeleteDialogOpen(false);
    setTeacherToDelete({email:""});
  };

  return (
    <>
    <Toaster
  position="top-center"
  reverseOrder={false}
/>
    <BaseCard title="Teachers Management">
      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Sr No
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Name                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Email ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  Actions
                </Typography>
              </TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {teachers.map((teacher, index) => (
              <TableRow key={index}>
                {/* Render table cells with teacher data */}
                <TableCell>{index + 1}</TableCell>
                <TableCell>{teacher.username}</TableCell>
                <TableCell>
                  <Typography color="textSecondary" fontSize="13px">
                    {teacher.email}
                  </Typography>
                </TableCell>
                
                <TableCell>
                  <IconButton aria-label="Edit" color="success">
                    <IconEdit />
                  </IconButton>
                  <IconButton aria-label="Delete" color="error" onClick={() => handleDeleteClick(teacher)}>
                    <IconTrash />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
        
      </TableContainer>
      
    </BaseCard>
    {/* Delete Confirmation Dialog */}
    <Dialog open={isDeleteDialogOpen} onClose={handleCancelDelete}>
    <DialogTitle>Delete Teacher</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Are you sure you want to delete {teacherToDelete.email} teacher?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancelDelete} color="primary">
        Cancel
      </Button>
      <Button onClick={handleConfirmDelete} color="primary" autoFocus>
        Delete
      </Button>
    </DialogActions>
  </Dialog>
  </>
  );
};

export default TeacherPerfomance;
