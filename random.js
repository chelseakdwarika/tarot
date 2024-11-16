// Get the container where the cards will be displayed
const cardContainer = document.getElementById('card-container');
const clearButton = document.getElementById('clear-button');

// Hide the clear button initially
clearButton.style.display = 'none';

// Event listeners for the "Draw Cards" buttons
document.getElementById('draw-1-card').addEventListener('click', () => drawCards(1));
document.getElementById('draw-3-cards').addEventListener('click', () => drawCards(3));
document.getElementById('draw-5-cards').addEventListener('click', () => drawCards(5));

// Function to draw cards based on the number of cards specified
function drawCards(numberOfCards) {
    // Clear the card container before drawing new cards
    cardContainer.innerHTML = '';

    // Fetch the card data from the updated path
    fetch('cards/cards.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load cards.txt');
            }
            return response.text();
        })
        .then(data => {
            // Parse the card data into an array of card objects
            const cards = data.split('\n').map(card => {
                const [title, image, description] = card.split('|').map(item => item.trim());
                return { title, image, description };
            }).filter(card => card.title && card.image && card.description);  // Filter out any incomplete cards

            if (cards.length === 0) {
                console.error('No valid cards found in cards.txt!');
                return;
            }

            // Shuffle the cards array
            const shuffledCards = shuffle(cards);
            
            // Select the cards to display
            const selectedCards = shuffledCards.slice(0, numberOfCards);
            
            // Display the selected cards
            selectedCards.forEach(card => {
                const cardElement = document.createElement('div');
                cardElement.classList.add('card');
                
                // Create a title element
                const titleElement = document.createElement('h2');
                titleElement.textContent = card.title;
                
                // Create an image element
                const imageElement = document.createElement('img');
                imageElement.src = card.image;
                imageElement.alt = card.title;
                
                // Create a description element
                const descriptionElement = document.createElement('p');
                descriptionElement.textContent = card.description;

                // Append the elements to the card container
                cardElement.appendChild(titleElement);
                cardElement.appendChild(imageElement);
                cardElement.appendChild(descriptionElement);
                
                // Add the card to the container
                cardContainer.appendChild(cardElement);
            });
            
            // Show the clear button after cards are drawn
            clearButton.style.display = 'inline-block';
        })
        .catch(error => {
            console.error('Error fetching the cards:', error);
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
