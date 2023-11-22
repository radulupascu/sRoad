import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import NewUserEval from './NewUserEval';
import Header from './Header';
import Chatbox from './Chatbox';
import About from './About'
import Auth from './Auth';
import Quiz from './Quiz';

const hasVisited = localStorage.getItem('hasVisited');

function App() {

  const [isFirstVisit, setIsFirstVisit] = useState(false);

  useEffect(() => {
    // Check if 'hasVisited' exists in localStorage
    let hasVisited = localStorage.getItem('hasVisited');
  
    if (hasVisited === null) {
      // If 'hasVisited' doesn't exist, set it to 'false' in localStorage
      localStorage.setItem('hasVisited', 'false');
      setIsFirstVisit(true);
    } else if (hasVisited === 'true') {
      setIsFirstVisit(false);
    } else {
      // In case 'hasVisited' is 'false' in localStorage
      localStorage.setItem('hasVisited', 'true');
      setIsFirstVisit(true);
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={isFirstVisit ? <NewUserEval /> : <Chatbox />}>
          </Route>

          <Route path="/about" element={<About />}>
          </Route>

          <Route path="/auth" element={<Auth />}>
          </Route>

          <Route path="/quiz" element={<Quiz />}>
          </Route>

        </Routes>

      </div>
    </Router>

  );
}

export default App
