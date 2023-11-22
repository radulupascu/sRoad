import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function NewUserEval() {
    const [questions] = useState([
        {
          questionText: 'What would you say is your level of expertise in cybersecurity?',
          answerOptions: ['Begginer', 'Intermediate', 'Advanced'],
        },
        {
          questionText: 'What would you like to use sRoad for?',
          answerOptions: ['Penetration testing', 'Reinforcing app security', 'Preparing for an interview', 'Other'],
        },
        // ... any other questions you have
      ]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(Array(questions.length).fill(''));
  const [showSummary, setShowSummary] = useState(false);

  const handleAnswerOptionClick = (answer) => {
    let newResponses = [...responses];
    newResponses[currentQuestion] = answer;

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setResponses(newResponses);
      setCurrentQuestion(nextQuestion);
    } else {
      setResponses(newResponses); // Update responses with the last answer
      handleSubmit(newResponses);  // Pass updated responses to handleSubmit
    }
  };

  const handleSubmit = (finalResponses) => {
    console.log('Selected Answers:', finalResponses);
    setShowSummary(true)
  };

  
  return (
    <div className="quiz">
      {showSummary ? (
        window.location.href="/quiz"
      ) : (
        <div>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>
            </div>
            <div className="question-text">{questions[currentQuestion].questionText}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => handleAnswerOptionClick(answerOption)}>
                {answerOption}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NewUserEval;
