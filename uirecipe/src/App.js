import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [messages, setMessages] = useState([]); // useState hook with two vars, messages = array of chat messages, setMessages updates messages state
  const [inputValue, setInputValue] = useState(''); // same hook. inputValye = current value of input field, other var to update inputValue state

  const start = async () => {
    window.location.reload(false);
    console.log('Start function called');
    axios.get('http://127.0.0.1:5000/start').then(response => {
      console.log(response.data.message);
    }).catch(error => {
      console.error('Error fetching data:', error);
    });
  };
  
  //async func called when user submits message form
  const handleSubmit = async (e) => {
    e.preventDefault(); //stops page from refreshing after submission
    //checks if input value is empty and returns if is
    if (inputValue.trim() === '') {
      return;
    }
    //creats a new message object 
    const newMessage = {
      content: inputValue,
      sender: 'user',
    };
    
    setMessages((prevMessages) => [...prevMessages, newMessage]); // addes new message object to messages array
    setInputValue(''); // updates input value to empty string again
    //send POST request to server
    try {
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newMessage.content }),
      });

      //waiting for server repponse to parse as JSON
      const data = await response.json();
      // create new bot message object
      console.log(data.message)
      const botMessage = {
        content: data.message,
        sender: 'bot',
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]); // add newBotMessage object to messages array
    } catch (error) {
      console.error('Error:', error); //check for error
    }
  };

  const renderMessageContent = (content) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="App">
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === 'user' ? 'user' : 'bot'}`}
            >
              {renderMessageContent(message.content)}
            </div>
          ))}
        </div>
        <form className="input-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      <div>
        <button onClick={start}>Start Chat Here</button>
      </div>
    </div>
  );
}

//const cors = require("cors");
//App.use(cors());
export default App;
