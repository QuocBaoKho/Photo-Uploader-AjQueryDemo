"use strict";
console.log("2");
const pics = document.querySelectorAll("img");

$(window).on("load", function () {
  const modal = $("#imageModal");
  $("img").on("click", function () {
    console.log("leuleu");
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalPic").src = this.src;
  });
  $(document).on("click", function (e) {
    if (e.target === modal[0])
      document.getElementById("imageModal").style.display = "none";
  });
  $("#closeModalBtn").on("click", function (e) {
    document.getElementById("imageModal").style.display = "none";
  });

  // Run code
});

function load() {
  const modal = $("#imageModal");
  $("img").on("click", function () {
    console.log("leuleu");
    document.getElementById("imageModal").style.display = "block";
    document.getElementById("modalPic").src = this.src;
  });
  $(document).on("click", function (e) {
    if (e.target === modal[0])
      document.getElementById("imageModal").style.display = "none";
  });
  $("#closeModalBtn").on("click", function (e) {
    document.getElementById("imageModal").style.display = "none";
  });
}

let imageInput = document.getElementById("imageInput");
const uploadImage = function () {
  if (imageInput.files.length != 0) {
    console.log("Appending process incoming...");
    const horizontalList = document.querySelector(".horizontal-list");

    const imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer");

    const uploadedPic = document.createElement("img");
    uploadedPic.src = URL.createObjectURL(imageInput.files[0]);

    const description = document.createElement("h1");
    description.style.textAlign = "center";
    description.innerHTML = document.getElementById("picName").value;

    imageContainer.appendChild(uploadedPic);
    imageContainer.appendChild(description);

    horizontalList.appendChild(imageContainer);
    load();
  }
};
