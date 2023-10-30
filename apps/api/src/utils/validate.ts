import { RequestHandler } from "express";
import { z, ZodType } from "zod";

/**
 *
 * @description Validate the body of requests using zod.
 * The parsed schema will overwrite the body which allows you to to refine incoming data
 */
export const validate = (schema: Record<string, ZodType>, fn: RequestHandler): RequestHandler => {
  return (req, res, next) => {
    if (!req.body) {
      res.status(400).json({
        message: "No request body",
      });
    }
    const result = z.object(schema).safeParse(req.body);

    if (result.success === false) {
      res.status(400).json({
        message: "Invalid request body",
        errors: result.error,
      });
      return;
    }

    req.body = result.data;
    fn(req, res, next);
  };
};
