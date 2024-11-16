// Function to create the HTML template for each card
const cardTemplate = (card) => `
  <div class="card-inner">
    <div class="card-front">
      <img src="${card.img_url}" alt="${card.title}" height="500px" width="275px" loading="lazy">
    </div>
    <div class="card-back">
      <h2 class="title1">${card.title}</h2>
      <p class="description1">${card.description}</p>
    </div>
  </div>`;

// Render the list of cards from the file
document.addEventListener("DOMContentLoaded", function () {
  const cardData = [];

  function renderCardData() {
    const list = document.querySelector("#card-list");

    fetch("cards/cards.txt")
      .then((res) => res.text())
      .then((text) => {
        const cards = text.split("---").map((card) => card.trim());
        cards.forEach((data) => {
          const [id, title, img_url, ...description] = data.split("\n");

          const card = document.createElement("div");
          card.classList.add("tarot-card");
          card.id = id;
          card.innerHTML = cardTemplate({
            title,
            img_url,
            description: description.join("\n"),
          });

          card.addEventListener("click", () => {
            openModal({
              title,
              img_url,
              description: description.join("\n"),
            });
          });

          list.appendChild(card);
        });
      });
  }

  // Fetch the data and render the cards
  renderCardData();

  // Function to get random cards from the list of all cards
  function getRandomCards(numberOfCards) {
    const allCards = Array.from(document.querySelectorAll(".tarot-card"));
    const selectedCards = [];

    while (selectedCards.length < numberOfCards) {
      const randomIndex = Math.floor(Math.random() * allCards.length);
      const randomCard = allCards[randomIndex];
      if (!selectedCards.includes(randomCard)) {
        selectedCards.push(randomCard);
      }
    }

    return selectedCards;
  }

  // Function to render the selected random cards in the container
  function renderSelectedCards(cards) {
    const selectedCardsContainer = document.querySelector("#selected-cards");
    selectedCardsContainer.innerHTML = ""; // Clear any previously selected cards

    cards.forEach((card) => {
      const selectedCardClone = card.cloneNode(true); // Clone the selected card element
      selectedCardsContainer.appendChild(selectedCardClone);
    });
  }

  // Button event listeners for drawing cards
  document.querySelector("#draw-cards-one").addEventListener("click", () => {
    const randomCards = getRandomCards(1);
    renderSelectedCards(randomCards);
  });

  document.querySelector("#draw-cards-three").addEventListener("click", () => {
    const randomCards = getRandomCards(3);
    renderSelectedCards(randomCards);
  });

  document.querySelector("#draw-cards-five").addEventListener("click", () => {
    const randomCards = getRandomCards(5);
    renderSelectedCards(randomCards);
  });

});
