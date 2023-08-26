// uploads.route.js
import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { uploadImage, getImageByFilename } from "../controllers/uploads.controller.js";

const uploadRoute = express.Router({ esModule: false });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({ storage });


uploadRoute.post("/", upload.single("file"), uploadImage);
uploadRoute.get("/:filename", getImageByFilename);

export default uploadRoute;
