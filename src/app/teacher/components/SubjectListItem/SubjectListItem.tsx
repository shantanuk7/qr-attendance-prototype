import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { IconQrcode,IconDots  } from "@tabler/icons-react";

function YourComponent(props:any) {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mx="auto"
      my={2}
      px={2}
      py={1.5}
      border={2}
      borderColor="#374151"
    >
      <div>
        <Typography variant="subtitle2">{props.course}</Typography>
        <Typography variant="h6">
          <strong>{props.subject}</strong>
        </Typography>
      </div>
      <div>
        <Button onClick={() => props.getAttendance(props.course, props.subject)}>
          <IconDots style={{ color: '#374151' }} />
        </Button>
        <Button onClick={() => props.newAttendance(props.course, props.subject)}>
          <IconQrcode style={{ color: '#374151' }} />
        </Button>
      </div>
    </Box>
  );
}

export default YourComponent;
