import { type RequestHandler } from "express";
import { User } from "../../db/models/user";

export const jwt: RequestHandler = async (req, res, next) => {
  //get token from cookie
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  //verify token
  try {
    const user = await User.verifyJWT(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
