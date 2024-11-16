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

  // Only hide cards on index.html
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

      // Show the specified number of cards
      for (let i = 0; i < num; i++) {
        if (allCards[i]) {
          allCards[i].style.display = 'block';
        }
      }
    }

    // Button click event listeners
    document.getElementById("draw-cards-one").addEventListener("click", function () {
      showCards(1); // Show 1 card
    });

    document.getElementById("draw-cards-three").addEventListener("click", function () {
      showCards(3); // Show 3 cards
    });

    document.getElementById("draw-cards-five").addEventListener("click", function () {
      showCards(5); // Show 5 cards
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
