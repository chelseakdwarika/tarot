// Get the container where the cards will be displayed
const cardContainer = document.getElementById('card-container');
const clearButton = document.getElementById('clear-button');

// Hide the clear button initially
clearButton.style.display = 'none';

// Event listeners for the "Draw Cards" buttons
document.getElementById('draw-3-cards').addEventListener('click', () => drawCards(3));
document.getElementById('draw-5-cards').addEventListener('click', () => drawCards(5));
document.getElementById('draw-10-cards').addEventListener('click', () => drawCards(10));

// Function to draw cards based on the number of cards specified
function drawCards(numberOfCards) {
    // Clear the card container before drawing new cards
    cardContainer.innerHTML = '';
  
    // Fetch the card data
    fetch('cards.txt')
        .then(response => response.text())
        .then(data => {
            // Parse the card data
            const cards = data.split('\n').map(card => card.trim()).filter(card => card.length > 0);
            
            // Shuffle the cards array
            const shuffledCards = shuffle(cards);
            
            // Select the cards to display
            const selectedCards = shuffledCards.slice(0, numberOfCards);
            
            // Display the selected cards
            selectedCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                cardElement.textContent = card;
                cardContainer.appendChild(cardElement);
            });
            
            // Show the clear button after cards are drawn
            clearButton.style.display = 'inline-block';
        });
}

// Function to shuffle an array (Fisher-Yates shuffle)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array; // Return shuffled array
}

// Event listener for the clear button
clearButton.addEventListener('click', () => {
    // Clear the card container
    cardContainer.innerHTML = '';
    
    // Hide the clear button again
    clearButton.style.display = 'none';
});
