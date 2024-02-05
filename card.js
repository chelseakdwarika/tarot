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

  /* function openModal({ title, img_url, description }) {
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");

    modalOverlay.innerHTML = `
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <h2>${title}</h2>
        <img src="${img_url}" alt="${title}" height="500px" width="275px" loading="lazy">
        <p>${description}</p>
      </div>
    `;

    document.body.appendChild(modalOverlay);
  }

  window.closeModal = function () {
    const modalOverlay = document.querySelector(".modal-overlay");
    modalOverlay.remove();
  };
*/
  renderCardData();
});
