"use strict";

window.addEventListener("load", initApp);

// init app
async function initApp() {
  console.log("initApp: app started");
  const characterData = await getJsonData("./assets/data/data.json");
  console.log("initApp: data fetched");
  createHtmlCards(characterData);
  console.log("initApp: html cards created");
}

// ====== DATA FUNCTIONS ======
// get json data from url
async function getJsonData(url) {
  const response = await fetch(url);
  return await response.json();
}

// ====== DOM MANIPULATION FUNCTIONS ======

// create html cards from array of objects
function createHtmlCards(characterData) {
  console.log("creating html cards");
  console.log(characterData);
  // loop through the data object
  for (const character of characterData) {
    // create the html card
    const htmlCard = /*html*/ `
            <article class="grid-item item-card">
                <h2>${character.name}</h2>
                <img src="${character.image}" alt="${character.name}">
                <p>"${character.catchPhrase}"</p>
                <p>${character.age} years old</p>
                <p>${character.occupation}</p>
            </article>
        `;
    // insert the html card into the grid container
    document.querySelector(".grid-container").insertAdjacentHTML("beforeend", htmlCard);
  }
  // select all the .item-card elements and attach the event listener to each one
  document.querySelectorAll(".item-card").forEach((card) => {
    card.addEventListener("click", function () {
      // show modal
      console.log(this);
      showModal();
    });
  });
}



// ====== DIALOG MODAL FUNCTIONS ======
// open modal
function showModal() {
  const modal = document.querySelector("#modal-container");
  const modalBackground = document.querySelector(".modal-background");
  const closeButton = document.querySelector("#close-dialog");
  modal.classList.remove("close");
  modal.classList.add("open");
  modal.show();
  // modal.removeEventListener("load", showModal);
  closeButton.addEventListener("click", closeModal);
  // close modal when clicking everything else than .modal-content and its children
  modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
      closeModal();
    }
  });
  // close modal when pressing the escape key
  modal.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeModal();
    }
  });
}

// close modal
function closeModal() {
  const modal = document.querySelector("#modal-container");
  modal.classList.remove("open");
  modal.classList.add("close");
  modal.close();
}
