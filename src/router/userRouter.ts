import { Router } from "express";

import detailsController from "../controller/details";
import allPrescriptionsController from "../controller/allPrescriptions";
import prescriptionController from "../controller/prescription";
import verifyToken from "../middlewares/verifyToken";

const router = Router();
router.use(verifyToken);

router.post("/details",detailsController);
router.get("/:userId/allPrescriptions",allPrescriptionsController);
router.get("/:presId/prescription",prescriptionController);

export default router;