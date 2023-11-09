// Import React for component creation
import React from 'react';

// Import App-wide styles and GameBoard-specific styles
import '../App.css'; 
import './GameBoard.css';

// GameBoard functional component definition
// It accepts `hiddenPhrase` and `wrongGuesses` as props
const GameBoard = ({ hiddenPhrase, wrongGuesses }) => {
  return (
    <div>
      {/* Display the phrase for the game, with some letters hidden */}
      <p className="GameBoard-phrase">{hiddenPhrase}</p>
      
      {/* Display the list of incorrect guesses made by the player */}
      <p className="GameBoard-wrongGuesses">
        Incorrect Guesses: {wrongGuesses.join(', ')}
      </p>
    </div>
  );
}

// Export the GameBoard component for use in other parts of the application
export default GameBoard;
