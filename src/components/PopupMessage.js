import React, { useState, useEffect } from 'react';
import { Snackbar, IconButton, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CloseIcon from '@mui/icons-material/Close';

const useStyles = makeStyles(() => ({
  popup: {
    color: 'black',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
  },
  message: {
    marginLeft: '8px',
  },
}));

const PopupMessage = ({ message, duration = 3000, backgroundColor, textColor, icon }) => {
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [duration]);

  const popupStyle = {
    backgroundColor: backgroundColor.startsWith('#') ? backgroundColor : `rgb(${backgroundColor})`,
    color: textColor,
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={open}
      onClose={() => setOpen(false)}
      autoHideDuration={duration}
    >
      <div className={classes.popup} style={popupStyle}>
        {icon && icon}
        <Typography variant="body1" className={classes.message}>
          {message}
        </Typography>
        <IconButton size="small" aria-label="close" color="inherit" onClick={() => setOpen(false)}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
    </Snackbar>
  );
};

export default PopupMessage;
