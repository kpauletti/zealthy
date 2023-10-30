import type { RequestHandler } from "express";
import multer from "multer";
import path from "path";
import { Ticket } from "../../../db/models/ticket";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../../../uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".png");
  },
});

const upload = multer({ storage: storage });

export const uploadPhoto = upload.single("photo");

export const createTicket: RequestHandler = async (req, res) => {
  try {
    const { user_id, description } = req.body;
    const photo_url = req.file ? req.file.filename : null;

    const ticket = await Ticket.create({ user_id, description, photo_url });

    res.status(201).json(ticket);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while creating the ticket" });
  }
};
