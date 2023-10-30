"use strict";

function renderPicList(picList) {
  const pictureList = picList.map(
    (item) => `<div class="imageContainer">
    <span class="removePic" id="remove_pic${item.id}">&times;</span>

  <img class="imageToModal" src="uploads/${item.image}" />
  <h1 style="text-align: center">${item.description}</h1>

</div>

`
  );
  $(".horizontal-list").html(pictureList.join(""));
}
$.ajax({
  type: "GET",
  url: "http://localhost:3000/getData",
  dataType: "json",
  success: function (info) {
    renderPicList(info);
    console.log("Successfully get images");
    load();
  },
});
$(window).on("load", function () {
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
        $.ajax({
          type: "GET",
          url: "http://localhost:3000/getData",
          dataType: "json",
          success: function (info) {
            console.log(info);
            renderPicList(info);
            load();
          },
        });
      },
      error: function (error) {
        console.error(error);
        alert("Error uploading image.");
      },
    });
  });

  // Run code
});

function load() {
  const modal = $("#imageModal");
  $(".imageToModal").on("click", function () {
    console.log("leuleu");
    $("#imageModal").css("display", "block");
    $("#modalPic").attr("src", this.src);
  });
  $(document).on("click", function (e) {
    if (e.target === modal[0]) {
      // document.getElementById("imageModal").style.display = "none";
      console.log("HIDE!");
      $("#imageModal").hide();
    }
  });
  $("#closeModalBtn").on("click", function () {
    // document.getElementById("imageModal").style.display = "none";
    $("#imageModal").hide();
    console.log("HIDE!");
  });
  $(".removePic").on("click", function () {
    let imageContainer = $(this).closest(".imageContainer");
    let image = imageContainer.find(".imageToModal").attr("src");
    let description = imageContainer.find("h1").text();
    console.log(image, description);
    console.log(imageContainer);
    const object = { image: image, description: description };
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/remove",
      contentType: "application/json",
      data: JSON.stringify(object),
      success: function (data) {
        console.log(data);
        alert(data);
        $.ajax({
          type: "GET",
          url: "http://localhost:3000/getData",
          dataType: "json",
          success: function (info) {
            console.log(info);
            renderPicList(info);
            load();
          },
        });
      },
      error: function (error) {
        console.error(error);
        alert("Error uploading image.");
      },
    });
  });
}

let imageInput = document.getElementById("imageInput");
const uploadImage = function () {
  // if (imageInput.files.length != 0) {
  //   console.log("Appending process incoming...");
  //   const horizontalList = document.querySelector(".horizontal-list");
  //   const imageContainer = document.createElement("div");
  //   imageContainer.classList.add("imageContainer");
  //   const uploadedPic = document.createElement("img");
  //   uploadedPic.src = URL.createObjectURL(imageInput.files[0]);
  //   const description = document.createElement("h1");
  //   description.style.textAlign = "center";
  //   description.innerHTML = document.getElementById("picName").value;
  //   imageContainer.appendChild(uploadedPic);
  //   imageContainer.appendChild(description);
  //   horizontalList.appendChild(imageContainer);
  //   load();
  // }
};
