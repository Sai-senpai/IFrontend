import React from 'react';
import { Typography, Container, Grid, Card, CardContent, CardHeader } from '@mui/material';

const ServicesPage = () => {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Our Services
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Create Notes" />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Easily create new notes to capture your ideas, thoughts, and reminders.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Update Notes" />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Edit and update your existing notes to keep them up to date and relevant.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="Delete Notes" />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Remove unwanted or outdated notes to keep your workspace organized and clutter-free.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="User Authentication" />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Securely authenticate and log in to access your personalized note-taking experience.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardHeader title="User Signup" />
            <CardContent>
              <Typography variant="body2" color="textSecondary">
                Sign up as a new user to create your account and start using the SaiNoteBook application.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ServicesPage;
