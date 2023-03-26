export function showDetails (characterData) {
    console.log("showDetails: showing details for below character");
    console.log(characterData);
    // NOTE: function recieves an array of objects, but I only need the object that macthes the clicked card
    // so I need to find the object that matches the clicked card.
    // Assuming that any dublicate objects in the array has been removed by previous functions,
    // I can do this by comparing the name of the clicked card with the name of the object in the array
    // and then use the index of the matching object to get the object from the array.
    // I can then use the object to populate the modal.
    // maybe the function should recieve the clicked card instead of the array of objects?
    // or maybe the function should recieve the array of objects and the clicked card and then find the object that matches the clicked card?
    showModal();
}

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