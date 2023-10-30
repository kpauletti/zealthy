import { type RequestHandler } from "express";
import { User } from "../../../db/models/user";

export const getUsers: RequestHandler = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
};
