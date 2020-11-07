import { Router } from "express";

import detailsController from "../controller/details";
import verifyToken from "../middlewares/verifyToken";

const router = Router();
router.use(verifyToken);

router.post("/details",detailsController);

export default router;