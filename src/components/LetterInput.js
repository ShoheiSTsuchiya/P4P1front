// Importing React and useState hook from 'react'
import React, { useState } from 'react';
// Importing the specific stylesheet for the LetterInput component
import './LetterInput.css';

// The LetterInput functional component takes a prop named 'onGuess'
// which is a function that will be called with the current guess
const LetterInput = ({ onGuess }) => {
  // State 'guess' is initialized as an empty string and will hold the user's current guess
  const [guess, setGuess] = useState('');

  // handleSubmit is a function that will be called when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submit action
    onGuess(guess);        // Calls the onGuess function passed as a prop with the current guess
    setGuess('');          // Resets the guess state to an empty string
  };

  // The component renders a form with an input and a submit button
  return (
    <form onSubmit={handleSubmit}>
      {/* The input allows a single character to be entered, calling setGuess on change */}
      <input 
        type="text" 
        value={guess} 
        onChange={(e) => setGuess(e.target.value)} 
        maxLength="1"
        required 
      />
      {/* The button is used to submit the form */}
      <button type="submit">Guess</button>
    </form>
  );
};

// Export the LetterInput component to be used in other parts of the application
export default LetterInput;
