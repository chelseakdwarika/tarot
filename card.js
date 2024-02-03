const cardTemplate = (card) => `
<div class="card-inner">
  <div class="card-front">
    <img src="${card.img_url}" alt="Card 1">
  </div>
  <div class="card-back">
    <h2 class="title1">${card.title}</h2>
    <p class="description1">${card.description}</p>
  </div>
</div>`;

document.addEventListener("DOMContentLoaded", function () {
  const cardData = [
//    { title: "The Empress", description: "Chris", img_url: "https://cdn.pixabay.com/photo/2016/03/01/12/43/lines-1230292_1280.png",},
//    { title: "The Fool", description: "Chris" },
//    { title: "The Chariot", description: "Chelsea" },
  ];

  function renderCardData() {
    const list = document.querySelector("#card-list");
    cardData.forEach((data, index) => {
      const card = document.createElement("div");
      card.classList.add("tarot-card");
      card.innerHTML = cardTemplate(data);
      list.appendChild(card);
    });

    fetch("/cards/cards.txt")
      .then((res) => res.text())
      .then((text) => {
        const cards = text.split("---").map((card) => card.trim());
        cards.forEach((data) => {
          const [title, img_url, ...description] = data.split("\n");

          const card = document.createElement("div");
          card.classList.add("tarot-card");
          card.innerHTML = cardTemplate({
            title,
            img_url,
            description: description.join("\n"),
          });
          list.appendChild(card);
        });
      });
  }

  renderCardData();
});
