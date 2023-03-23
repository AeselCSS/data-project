"use strict";
window.addEventListener("load", initApp);

// init app
function initApp() {
    console.log("initApp: app started");
}

// ====== DIALOG MODAL FUNCTIONS======
// showModal function that when called will open the modal and assign event listeners to the modal's close button and the modal's backdrop
function showModal() {
  const modal = document.querySelector("#modal-container");
  const closeButton = document.querySelector("#close-dialog");
  modal.classList.remove("close");
  modal.classList.add("open");
  modal.show();
  // modal.removeEventListener("load", showModal);
  closeButton.addEventListener("click", closeModal);
  // close modal when clicking outside of the modal
  document.addEventListener("click", function (event) {
    // Check if the click target is not the .modal-content or the .modal-content's children
    if (!event.target.closest(".modal-content")) {
      closeModal();
    }
  });
}

// closeModal function that when called will close the modal and remove the event listeners from the modal's close button and the modal's backdrop
function closeModal() {
  const modal = document.querySelector("#modal-container");
  modal.classList.remove("open");
  modal.classList.add("close");
  modal.close();
}