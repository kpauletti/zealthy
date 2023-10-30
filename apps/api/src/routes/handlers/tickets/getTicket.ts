import type { RequestHandler } from "express";
import { Ticket } from "../../../db/models/ticket";
import { User } from "../../../db/models/user";

export const getTicket: RequestHandler = async (req, res) => {
  const { ticketId } = req.params;

  try {
    const ticket = await Ticket.findOne({
      where: {
        id: ticketId,
      },
      include: [{ model: User, as: "user", attributes: ["id", "name", "email"] }],
    });

    if (!ticket) {
      res.status(404).json({
        message: "Ticket not found",
      });
      return;
    }

    res.status(200).json({
      ticket,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
