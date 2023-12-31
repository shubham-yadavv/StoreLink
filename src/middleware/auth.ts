import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Authentication failed: Token missing" });
  }

  jwt.verify(token, "secret", (err: any, user: any) => {
    if (err) {
      return res
        .status(401)
        .json({ error: "Authentication failed: Invalid token" });
    }

    if (user && user.id) {
      req.user = user;
      console.log(req.user.id);
      next();
    } else {
      return res
        .status(401)
        .json({ error: "Authentication failed: Invalid user data" });
    }
  });
};
