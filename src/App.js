import React, { useState } from 'react';
import GameBoard from './components/GameBoard';
import LetterInput from './components/LetterInput';
import { getRandomPhrase, generateHiddenPhrase } from './gameLogic';
import './App.css';

// List of phrases for the game
const phrases = ["Wheel Of Fortune", "Turn your wounds into wisdom", "Change the world from here"];
// Maximum number of incorrect guesses allowed
const maxWrongGuesses = 5;

const App = () => {
  // State for the current phrase, hidden phrase, and list of wrong guesses
  const [phrase, setPhrase] = useState(getRandomPhrase(phrases));
  const [hiddenPhrase, setHiddenPhrase] = useState(generateHiddenPhrase(phrase));
  const [wrongGuesses, setWrongGuesses] = useState([]);

  // Function to start a new game
  const resetGame = () => {
    const newPhrase = getRandomPhrase(phrases);
    setPhrase(newPhrase);
    setHiddenPhrase(generateHiddenPhrase(newPhrase));
    setWrongGuesses([]);
  };

  // Function to handle the letter guess input from the user
  const handleGuess = (guess) => {
    // Check if the game is over, if so, exit the function early
    if (!hiddenPhrase.includes('*') || wrongGuesses.length >= maxWrongGuesses) {
      return;
    }

    // Validate the guess to ensure it's a single letter
    if (!/^[a-z]$/i.test(guess)) {
      alert('Invalid guess. Please enter a single alphabet letter.');
      return; // Exit the function if the guess is invalid
    }

    // Convert the guess to lowercase for consistency
    guess = guess.toLowerCase();
    let isCorrect = false;
    let newHiddenPhrase = '';

    // Update the hidden phrase based on the guess
    for (let i = 0; i < phrase.length; i++) {
      if (guess === phrase[i].toLowerCase() && hiddenPhrase[i] === '*') {
        isCorrect = true;
        newHiddenPhrase += phrase[i];
      } else {
        newHiddenPhrase += hiddenPhrase[i];
      }
    }

    // If the guess was correct, update the hidden phrase state
    if (isCorrect) {
      setHiddenPhrase(newHiddenPhrase);
    } else {
      // If the guess was incorrect, add it to the wrong guesses list
      setWrongGuesses(wg => [...wg, guess]);
    }
  };

  // Calculate the number of remaining guesses
  const remainingGuesses = maxWrongGuesses - wrongGuesses.length;

  // Determine the game end class based on the game state
  const gameEndClass = !hiddenPhrase.includes('*') ? 'victory-animation' 
                    : wrongGuesses.length >= maxWrongGuesses ? 'defeat-animation' 
                    : '';

  // Render the game UI
  return (
    <div className={`App fade-in ${gameEndClass}`}>
      <h1 className="fade-in">React Wheel Of Fortune</h1>
      <p>Welcome to the game! Try to guess the hidden phrase, one letter at a time.</p>
      <p>You have a maximum of {maxWrongGuesses} incorrect guesses. Use them wisely!</p>
      
      <GameBoard className="fade-in" hiddenPhrase={hiddenPhrase} wrongGuesses={wrongGuesses} />
      <LetterInput onGuess={handleGuess} disabled={remainingGuesses <= 0} />
      
      <p>You have {remainingGuesses} guesses left.</p>

      {!hiddenPhrase.includes('*') && <p className="fade-in">Congratulations! You've uncovered the hidden phrase!</p>}
      {wrongGuesses.length >= maxWrongGuesses && <p className="fade-in">Out of chances. The phrase was: "{phrase}".</p>}
      
      {(hiddenPhrase.includes('*') && wrongGuesses.length < maxWrongGuesses) ? (
        <button className="state-change" onClick={resetGame}>Start New Game</button>
      ) : (
        <button className="fade-in" onClick={resetGame}>Play Again</button>
      )}
    </div>
  );
}

export default App;
