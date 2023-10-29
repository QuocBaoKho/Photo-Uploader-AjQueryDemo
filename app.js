"use strict";
function renderPicList(picList) {
  const pictureList = picList.map(
    (item) => `<div class="imageContainer">
  <img src="uploads/${item.image}" />
  <h1 style="text-align: center">${item.description}</h1>
</div>`
  );
  $(".horizontal-list").html(pictureList.join(""));
}
$(document).ready(function () {
  $("#uploadForm").on("submit", function (e) {
    e.preventDefault();
    var imageInput = document.getElementById("imageInput").files[0].name;
    var descriptionInput = $("#picName").val();
    var formData = new FormData(this);
    console.log(imageInput);
    console.log(descriptionInput);
    for (const value of formData.values()) {
      console.log("yeah");
      console.log(value);
    }

    let data = {};
    data.image = imageInput;
    data.description = descriptionInput;
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/upload",
      data: formData,
      contentType: "application/json",
      contentType: false,
      processData: false,
      success: function (data) {
        console.log(data);
        alert(data);
      },
      error: function (error) {
        console.error(error);
        alert("Error uploading image.");
      },
    });
  });
});
$(window).on("load", function () {
  const modal = $("#imageModal");
  $("img").on("click", function () {
    console.log("leuleu");
    // document.getElementById("imageModal").style.display = "block";
    $("#imageModal").css("display", "block");
    // document.getElementById("modalPic").src = this.src;
    $("#modalPic").attr("src", this.src);
  });
  $(document).on("click", function (e) {
    if (e.target === modal[0]) {
      // document.getElementById("imageModal").style.display = "none";
      $("#imageModal").hide();
    }
  });
  $("#closeModalBtn").on("click", function (e) {
    // document.getElementById("imageModal").style.display = "none";
    $("#imageModal").hide();
  });
  $.ajax({
    type: "GET",
    url: "http://localhost:3000/getData",
    dataType: "json",
    success: function (info) {
      renderPicList(info);
    },
  });
  // Run code
});

function load() {
  const modal = $("#imageModal");
  $("img").on("click", function () {
    console.log("leuleu");
    // document.getElementById("imageModal").style.display = "block";
    $("#imageModal").css("display", "block");
    // document.getElementById("modalPic").src = this.src;
    $("#modalPic").attr("src", this.src);
  });
  $(document).on("click", function (e) {
    if (e.target === modal[0]) {
      // document.getElementById("imageModal").style.display = "none";
      $("#imageModal").hide();
    }
  });
  $("#closeModalBtn").on("click", function (e) {
    // document.getElementById("imageModal").style.display = "none";
    $("#imageModal").hide();
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
