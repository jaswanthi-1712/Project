// uploads.controller.js

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Controller function to upload image
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  return res.send({
    url: `/uploads/${req.file.filename}`,
  });
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Controller function to get image by filename
export const getImageByFilename = (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, "../uploads", filename);

  fs.readFile(imagePath, (err, data) => {
    if (err) {
      console.log("Error fetching image:", err);
      return res.status(404).send("Image not found.");
    }

    // Convert image data to a Data URL format
    const base64Image = Buffer.from(data).toString("base64");
    const imageDataUrl = `data:image/jpeg;base64,${base64Image}`;
    // console.log("input",imagePath);
    // console.log("output",imageDataUrl);
    return res.send(imageDataUrl);
  });
};