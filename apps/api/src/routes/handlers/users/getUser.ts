import { type RequestHandler } from "express";
import { User } from "../../../db/models/user";

export const getUser: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).json({
            message: "User not found",
        });
        return;
    }
    res.json(user);
};
