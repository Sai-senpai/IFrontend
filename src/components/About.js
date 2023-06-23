import React from 'react';
import { Typography, Container, Paper, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 16, // Replace with your desired value
    marginBottom: 16, // Replace with your desired value
  },
  paper: {
    padding: 16, // Replace with your desired value
  },
}));

const AboutPage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant="h4" component="h1" gutterBottom>
          About Page
        </Typography>
        <Typography variant="body1" paragraph>
          This is a MERN stack project that allows users to store notes.
        </Typography>
        <Typography variant="body1" paragraph>
          Features:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="User authentication and authorization" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Creating, editing, and deleting notes" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Storing notes securely in a database" />
          </ListItem>
        </List>
        <Typography variant="body1" paragraph>
          Technologies used:
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="MongoDB - for the database" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Express - as the Node.js web application framework" />
          </ListItem>
          <ListItem>
            <ListItemText primary="React - for building the user interface" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Node.js - for the backend server" />
          </ListItem>
        </List>
        <Typography variant="body1">
          Created by Sairam
        </Typography>
      </Paper>
    </Container>
  );
};

export default AboutPage;
