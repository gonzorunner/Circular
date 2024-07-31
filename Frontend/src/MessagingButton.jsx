/* eslint-disable */
import React from 'react'
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { IconButton, Badge, Tooltip } from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat';

function MessagingButton(props) {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    // this could also be a prop of MessagingButton
    // const [messages, setMessages] = React.useState(1);
    
    const toggleDrawer = (toggle) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(toggle);
    }

    return (
        <Tooltip title='Send a message'>

            <IconButton
              to='/messages'
              component={RouterLink}
              >
                <Badge
                badgeContent={props.messages}
                color="error">
                    <ChatIcon />
                </Badge>
                
            </IconButton>
            
        </Tooltip>
    )
}

export default MessagingButton