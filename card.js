const cardTemplate = (title, description) => `
<div class="card-inner">
  <div class="card-front">
    <img src="https://cdn.pixabay.com/photo/2016/03/01/12/43/lines-1230292_1280.png" alt="Card 1">
  </div>
  <div class="card-back">
    <h2 class="title1">${title}</h2>
    <p class="description1">${description}</p>
  </div>
</div>`;

document.addEventListener("DOMContentLoaded", function () {
  const cardData = [
    { title: "The Empress", description: "Chris" },
    { title: 'The Fool<script>alert("fuck")</script>', description: "Chris" },
    { title: "The Chariot", description: "Chelsea" },
  ];

  function renderCardData() {
    const list = document.querySelector("#card-list");
    cardData.forEach((data, index) => {
      const card = document.createElement("div");
      card.classList.add("tarot-card");
      card.innerHTML = cardTemplate(data.title, data.description);
      list.appendChild(card);
    });
  }

  renderCardData();
});
