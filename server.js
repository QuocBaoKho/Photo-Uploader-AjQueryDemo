const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 3000;

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads will be stored in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // Unique file name
  },
});

const upload = multer({ storage });
app.use(cors());
// Serve static files from the 'public' directory

// Parse JSON data
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// POST endpoint to handle image upload and data storage
app.post("/upload", upload.single("image"), (req, res) => {
  const { picName } = req.body;
  const imageUrl = req.file.filename;
  // Read the existing JSON file
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to read JSON file" });
      return;
    }
    console.log(picName);

    console.log(data);
    var jsonData = JSON.parse(data);

    // Add the new data to the JSON object
    jsonData.push({ image: imageUrl, description: picName });

    // Write the updated JSON data back to the file
    fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to write JSON file" });
        return;
      }

      res.json({ message: "Image uploaded and description added." });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
