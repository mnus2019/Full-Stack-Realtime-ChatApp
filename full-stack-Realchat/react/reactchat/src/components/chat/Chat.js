import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";



// import './Chat.css';



let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
// const ENDPOINT = 'localhost:8000';

  useEffect(() => {
    const {name, room} = queryString.parse(location.search);
   
    console.log(location.search)
   
    socket = io("http://localhost:8000")
  
 
   
    setName(name);
    setRoom(room);
    socket.emit('join',{name,room},()=>{
      
    });
    return()=>{
      socket.emit('disconnect');
      socket.off();
    }

      
  },["http://localhost:8000",location.search]);

  useEffect(() => {
    //socket = io("http://localhost:8000")
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  

  console.log(message,messages);
 

  return (
  <div className="outerContainer">
    <div className="container">
      <input type="text"
      value={message}
      onChange={(event)=>setMessage(event.target.value)}
      onKeyPress={e=>e.key==='Enter' ? sendMessage :null}
      
      />
    </div>
  </div>
  );
}

export default Chat;
