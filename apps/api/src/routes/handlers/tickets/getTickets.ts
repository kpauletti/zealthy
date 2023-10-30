import type { RequestHandler } from "express";
import { Ticket } from "../../../db/models/ticket";

export const getTickets: RequestHandler = async (req, res) => {
  /**
   * If the user is not an admin, they can only view their own tickets
   */
  if (req.user?.role === "admin") {
    const tickets = await Ticket.findAll();
    res.status(200).json(tickets);
    return;
  }

  const tickets = await Ticket.findAll({
    where: {
      user_id: req.user.id as string,
    },
  });

  res.status(200).json(tickets);
};
