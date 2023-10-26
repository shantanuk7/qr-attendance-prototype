'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '@/app/teacher/components/container/PageContainer';
// components
import Analytics from '@/app/teacher/components/dashboard/Analytics';

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={12}>
          <Analytics />
        </Grid>       
      </Grid>
    </Box>
  </PageContainer>
  )
}

export default Dashboard;
