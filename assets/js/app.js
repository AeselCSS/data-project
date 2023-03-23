"use strict";

// init app
function initApp() {
    console.log("initApp: app started");
}

// ====== DIALOG MODAL FUNCTIONS======
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

function closeModal() {
  const modal = document.querySelector("#modal-container");
  modal.classList.remove("open");
  modal.classList.add("close");
  modal.close();
}

