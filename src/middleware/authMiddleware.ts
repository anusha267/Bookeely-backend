import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(
      token,
      process.env.BOOKENZY_JWT_SECRET as string,
      (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        (req as any).user = user; // Now TypeScript recognizes this line
        next();
      }
    );
  } else {
    res.sendStatus(401);
  }
};
