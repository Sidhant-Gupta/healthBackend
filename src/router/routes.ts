import express, { NextFunction, Request, Response } from "express";
const router = express.Router();

/* GET home page. */
router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("HealthCare API Server");
});

export default router;