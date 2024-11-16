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

document.addEventListener("DOMContentLoaded", function () {
  const cardData = [];

  // Function to shuffle the cards array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  }

  // Only hide cards unless button is clicked on index.html
  if (window.location.pathname === '/index.html') {
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

            card.style.display = 'none'; // Hide all cards initially on index.html

            list.appendChild(card);
          });
        });
    }

    function showCards(num) {
      const allCards = document.querySelectorAll('.tarot-card');

      // Hide all cards initially
      allCards.forEach(card => card.style.display = 'none');

      // Shuffle the cards array
      const shuffledCards = Array.from(allCards);
      shuffleArray(shuffledCards);

      // Show the specified number of random cards
      for (let i = 0; i < num; i++) {
        if (shuffledCards[i]) {
          shuffledCards[i].style.display = 'block';
        }
      }
    }

    // Button click event listeners
    document.getElementById("draw-cards-one").addEventListener("click", function () {
      showCards(1); // Show 1 random card
    });

    document.getElementById("draw-cards-three").addEventListener("click", function () {
      showCards(3); // Show 3 random cards
    });

    document.getElementById("draw-cards-five").addEventListener("click", function () {
      showCards(5); // Show 5 random cards
    });

    renderCardData(); // Render cards initially
  } else {
    // If not on index.html (i.e., on directory.html), render all cards by default
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

            list.appendChild(card);
          });
        });
    }

    renderCardData(); // Render all cards on directory.html
  }
});
