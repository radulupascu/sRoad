import React, { useState, useEffect } from 'react';

function parseCourseDetails(text) {
  text = text.replace(/: /g, ":\n");
  text = text.replace(/(\*\*(?=\d+\.))/g, "\n$1");
  return text;
}

function Chatbox() {
  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem('chatMessages')) || [{ text: 'Welcome!', sender: 'chatbot' }]
  );
  const [userInput, setUserInput] = useState('');
  const [botTyping, setBotTyping] = useState(false);

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleBotResponse = (response, sender) => {
    setBotTyping(true);
    let index = 0;
    let typingMsg = '';
    setMessages((currentMessages) => [...currentMessages, { text: '', sender: 'chatbot' }]);

    const intervalId = setInterval(() => {
      if (index < response.length) {
        typingMsg += response.charAt(index);
        setMessages((currentMessages) => {
          const newMessages = [...currentMessages];
          newMessages[newMessages.length - 1] = { text: typingMsg, sender };
          return newMessages;
        });
        index++;
      } else {
        clearInterval(intervalId);
        setBotTyping(false);
      }
    }, 6);
  };

  const sendMessage = async () => {
    if (userInput.trim() !== '') {
      const trimmedInput = userInput.trim();
      const userMessage = { text: trimmedInput, sender: 'user' };
      setMessages((currentMessages) => [...currentMessages, userMessage]);

      // Add a 'Fetching data...' message from the chatbot before the fetch request
      const fetchingMessage = { text: 'Fetching data...', sender: 'chatbot' };
      setMessages((currentMessages) => [...currentMessages, fetchingMessage]);

      try {
        const response = await fetch('http://localhost:8008/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ message: trimmedInput })
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Remove the 'Fetching data...' message
        setMessages((currentMessages) => currentMessages.filter(msg => msg !== fetchingMessage));

        handleBotResponse(parseCourseDetails(data.response) || 'No response from the bot.');
      } catch (error) {
        console.error('Fetch error:', error);

        // Remove the 'Fetching data...' message and show error
        setMessages((currentMessages) => currentMessages.filter(msg => msg !== fetchingMessage));
        handleBotResponse('Error fetching response.');
      }

      setUserInput('');
    }
  };

  const handleSend = () => {
    sendMessage();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const renderMessage = (msg, index) => {
    const icon = msg.sender === 'user' ? '👤' : '🤖';
    return (
      <div key={index} className="chat-message">
        <strong>{icon} {msg.sender}:</strong> {msg.text}
      </div>
    );
  };

  return (
    <div className="chat-app-container">
      <div id="chat-container" className="chat-container">
        {messages.map(renderMessage)}
      </div>
      <div className="input-container">
        <input 
          type="text" 
          value={userInput} 
          onChange={handleInputChange}
          onKeyPress={handleKeyPress} 
          disabled={botTyping}
        />
        <button onClick={handleSend} disabled={botTyping || userInput.trim() === ''}>Send</button>
      </div>
    </div>
  );
}

export default Chatbox;
