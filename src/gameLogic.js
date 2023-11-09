// This file contains the logic for the game

// Function to get a random phrase from an array of phrases
export function getRandomPhrase(phrases) {
    // Calculate a random index based on the length of the phrases array
    const randomIndex = Math.floor(Math.random() * phrases.length);
    // Return the phrase at the computed random index
    return phrases[randomIndex];
  }
  
  // Function to convert the chosen phrase into a string with hidden characters (except spaces)
  export function generateHiddenPhrase(phrase) {
    // Replace all characters that are not spaces with asterisks to hide them
    return phrase.replace(/[^\s]/g, '*');
  }
  
  // Function to process the user's guess and update the hidden phrase
  export function processGuess(fullPhrase, hiddenPhrase, guess) {
    // Convert the guess to lowercase for case-insensitive comparison
    guess = guess.toLowerCase();
    let newHiddenPhrase = ''; // Initialize a new string to build the updated hidden phrase
  
    // Loop through each character of the full phrase
    for (let i = 0; i < fullPhrase.length; i++) {
      // If the current character matches the guess, reveal that character
      if (guess === fullPhrase[i].toLowerCase()) {
        newHiddenPhrase += fullPhrase[i]; // Add the guessed character to the new hidden phrase
      } else {
        // Otherwise, retain the existing character from the hidden phrase
        newHiddenPhrase += hiddenPhrase[i];
      }
    }
  
    // Return the updated hidden phrase with correctly guessed letters revealed
    return newHiddenPhrase;
  }
  