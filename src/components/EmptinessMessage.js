import React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  message: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: '69px',
  },
}));

const EmptinessMessage = () => {
  const classes = useStyles();

  return <p className={classes.message}>Why such emptiness here</p>;
};

export default EmptinessMessage;
