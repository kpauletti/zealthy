import { z } from "zod";
import { Ticket } from "../../../db/models/ticket";
import { validate } from "../../../utils/validate";

export const updateTicket = validate(
  {
    id: z.string(),
    resolution: z.string(),
    status: z.enum(["new", "in_progress", "resolved"]),
  },
  async (req, res) => {
    try {
      const ticket = await Ticket.update(
        {
          resolution: req.body.resolution,
          status: req.body.status,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      );
      res.status(200).json({ ticket });
      return;
    } catch (error) {
      res.status(500).json({ error });
    }
  }
);
