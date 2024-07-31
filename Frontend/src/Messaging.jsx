/* eslint-disable */
import { List, ListItem} from '@mui/material'
import Message from './Message';
import React from 'react'

function Messaging() {
    // dummy data
  const [messages, setMessages] = React.useState([
    {
        user: "bob",
        text: "I like that lamp. Does it work?",
        time: "12:00 PM 03-03-2023",
        // ???
        id: 1
    },
    {
        user: "alice",
        text: "Yes it works good. Do you want it?",
        time: "12:00 PM 03-03-2023",
        id: 2
    },
    {
        user: "bob",
        text: "Yes i'll give you my watch for it",
        time: "12:00 PM 03-03-2023",
        id: 3
    },
    {
        user: "alice",
        text: "Great can I meet you at the coffee shop?",
        time: "12:00 PM 03-03-2023",
        id: 4
    },
]);
// set as current user first
  const [username, setUsername] = React.useState("bob")

  return (
    <div>
        <List>
            {messages.map((msg => (
            <ListItem key={msg.id}>
                <Message
                  isMine={msg.user === username}
                  user={msg.user}
                  text={msg.text}
                  />
            </ListItem>
            )))}
            
        </List>

    </div>
  )
}

export default Messaging