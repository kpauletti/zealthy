import { User } from "../../db/models/user";
import { z } from "zod";
import { validate } from "../../utils/validate";
import bcrypt from "bcrypt";

export const login = validate(
  {
    email: z.string().email(),
    password: z.string().min(8),
  },
  async (req, res) => {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        res.status(401).json({
          message: "Invalid credentials",
        });
        return;
      }

      const passwordMatch = bcrypt.compareSync(req.body.password, user.passwordHash);

      if (!passwordMatch) {
        res.status(401).json({
          message: "Invalid credentials",
        });
        return;
      }

      const token = user.generateJWT();
      res.cookie("token", token);

      delete user.passwordHash;
      res.json({ token, ...user.toJSON() });
    } catch (error) {
      res.status(400).json({
        message: "Invalid request body",
        errors: error.errors,
      });
    }
  }
);
