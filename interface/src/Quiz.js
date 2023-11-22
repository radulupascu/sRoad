import React, { useState } from 'react';

const questions = [
  { question: "What is the difference between a virus and a Trojan horse?", options: ["A virus is a type of malware that spreads on its own, while a Trojan horse relies on user actions.", "A virus is a type of malware that steals sensitive information, while a Trojan horse damages files.", "A virus and a Trojan horse are the same thing.", "A virus is a type of malware that encrypts data, while a Trojan horse deletes files."], answer: "A virus is a type of malware that spreads on its own, while a Trojan horse relies on user actions." },
  { question: "Why is password hashing important for storing passwords securely?", options: ["To make passwords easier to remember.", "To prevent unauthorized access to user accounts.", "To generate stronger passwords.", "To speed up the login process."], answer: "To prevent unauthorized access to user accounts." },
  { question: "When might you choose a stateful firewall over a stateless firewall in a network?", options: ["Stateless firewalls are always a better choice for all network configurations.", "Stateful firewalls are only used for small networks.", "Stateful firewalls are preferred when you need to track the state of active connections.", "Stateless firewalls provide better protection against all types of threats."], answer: "Stateful firewalls are preferred when you need to track the state of active connections." },
  { question: "How does Content Security Policy (CSP) contribute to the security of web applications?", options: ["CSP prevents all scripts from running in web applications.", "CSP allows web applications to execute any script without restrictions.", "CSP defines and enforces which scripts can be executed, reducing the risk of cross-site scripting (XSS) attacks.", "CSP only affects the performance of web applications but does not enhance security."], answer: "CSP defines and enforces which scripts can be executed, reducing the risk of cross-site scripting (XSS) attacks." },
  { question: "Describe the correlation engine in a SIEM system. How does it help in detecting and responding to security incidents?", options: ["The correlation engine in a SIEM system is responsible for encrypting all incoming data.", "The correlation engine in a SIEM system is used for hardware management.", "The correlation engine in a SIEM system analyzes incoming security events and alerts based on predefined rules to detect complex security incidents.", "The correlation engine in a SIEM system is used to generate software licenses."], answer: "The correlation engine in a SIEM system analyzes incoming security events and alerts based on predefined rules to detect complex security incidents." },
  { question: "Discuss the role of responsible disclosure in handling zero-day vulnerabilities. What ethical considerations should security researchers keep in mind?", options: ["Responsible disclosure is not necessary for zero-day vulnerabilities.", "Responsible disclosure involves disclosing vulnerabilities to the public immediately.", "Responsible disclosure involves privately notifying the affected vendor or organization and allowing them time to patch the vulnerability before public disclosure.", "Responsible disclosure means selling zero-day vulnerabilities to the highest bidder."], answer: "Responsible disclosure involves privately notifying the affected vendor or organization and allowing them time to patch the vulnerability before public disclosure." }
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleSubmit = (userAnswer) => {
    if (userAnswer === questions[currentQuestion].answer) {
      setCorrectAnswers(correctAnswers + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const userLevel = correctAnswers < 3 ? "Beginner" : correctAnswers < 6 ? "Intermediate" : "Advanced";
      console.log(`Correct Answers: ${correctAnswers}`); //calin aici
      console.log(`User Level: ${userLevel}`);
      window.location.href="/";
    }
  };

  return (
    <div>
      <div className='answer-section'>
        <p>{questions[currentQuestion].question}</p>
        {questions[currentQuestion].options.map((option, index) => (
          <button key={index} onClick={() => handleSubmit(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
