/* eslint-disable */
import React from 'react';
import { Paper, Typography } from '@mui/material';

function Message({isMine, user, text}) {
  
    if (isMine) {
       return (
        <Paper>
            myMessage: {text}
        </Paper>
      ) 
    } else {
        return (
        <Paper>
            Message: {text}
        </Paper>
        )
    }
      
}

export default Message