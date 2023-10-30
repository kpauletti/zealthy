import { User } from "../../db/models/user";
import { z } from "zod";
import { validate } from "../../utils/validate";
import bcrypt from "bcrypt";

export const signup = validate(
  {
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  },
  async (req, res) => {
    try {
      await User.create({
        name: req.body.name,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      res.json({
        message: "User created",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({
        errors: error.errors,
      });
    }
  }
);
