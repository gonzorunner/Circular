import React, {useEffect} from 'react'
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Menu, MenuItem, MenuList, ListItem, Typography, Popper, Paper, Box, ClickAwayListener } from '@mui/material';
import { bgcolor } from '@mui/system';
import { green, grey } from '@mui/material/colors';

const NotificationBell = () => {
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifications, setNotifications] = React.useState([]);
    const [numberOfNewNotifications, setNumberOfNewNotifications] = React.useState(null);

    const newNotifications = `You have ${numberOfNewNotifications} new notifications!`;
    const noNotifications = 'No new notifications';
    const notSignedInNotifications = 'Sign in to view notifications'; // not really needed?

    // fetches the notifications from the database
    const fetchNotifications = () => {
        const user = sessionStorage.getItem('user');
        // only run the following code if a user is signed in
        if (user) {
            fetch(`http://localhost:3010/v0/notifications/${user}`, {
                method: 'GET'
            })
            .then((response) => response.json())
            .then((json) => {
                setNotifications(json);
            })
            .catch((error) => {
                console.error('Error fetching notifications:', error);
            });
        }
    };
    
    const countNumberOfNewNotifications = () => {
        let newNotifsCount = 0;
        for (let i = 0; i < notifications.length; i++) {
            // console.log(`Notification ${i+1}: ${notifs[i].seen}`);
            if (!notifications[i].seen) {
                newNotifsCount++;
            }
        }
        // console.log(newNotifsCount);
        setNumberOfNewNotifications(newNotifsCount);
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    useEffect(() => {
        countNumberOfNewNotifications();
    }, [notifications]); // notifications dependency added, so this hook runs whenever notifications is updated

    // updates a notification in the notifications state by setting it's seen property/key to true
    const markNotificationAsSeen = (id) => {
        let prevNotifications = [...notifications]; // making complete copy of the notifications state (notifications is an array)
        setNotifications(prevNotifications.map(notif => {
            if (notif.id == id) {
                return { ...notif, seen: true };
            } else {
                return notif;
            }
        }));
    }

    // this function handles the event where a notification in the notifications tray is clicked
    const handleMenuItemClick = (notification) => {
        // only update the offer corresponding to the notification if it hasn't already been seen
        if (!notification.seen) {
            fetch(`http://localhost:3010/v0/notifications/offer_id/${notification.offer_id}`, {
                method: 'PUT'
            })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Network response was not ok: (${response.status})`);
                }
                markNotificationAsSeen(notification.id);
                // console.log(notifications);
            })
            .catch((error) => {
                console.error('Error fetching notifications:', error);
            });
        }
    } 

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const id = open ? 'notifications-menu' : undefined;

    return (
        <>
            {sessionStorage.getItem('user') ? (
                <>
                    <Tooltip title={numberOfNewNotifications ? newNotifications : noNotifications}>
                        <IconButton
                            onClick={handleClick}
                        >
                            <Badge
                                badgeContent={numberOfNewNotifications}
                                color="error"
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <Popper
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                    >
                        <Box sx={{ bgcolor: 'background.paper' }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    id="notification-list"
                                >
                                    {notifications.map(notif => (
                                        <MenuItem
                                            key={notif.id}
                                            sx={{
                                                bgcolor: notif.seen ? 'divider' : 'background.paper'
                                            }}
                                            onClick={() => handleMenuItemClick(notif)}
                                        >
                                            <Typography variant='h6'><span> User {notif.user} has made an offer on your {notif.item} </span></Typography>
                                            <Typography
                                                variant='subtitle1'
                                                display='block'
                                            >
                                                {notif.date}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>

                        </Box>
                    </Popper>
                </>
            ) : (
                <Tooltip title={notSignedInNotifications}>
                    <IconButton>
                        <NotificationsIcon />
                    </IconButton>
                </Tooltip>
            )}
        </>
    )
}
export default NotificationBell
