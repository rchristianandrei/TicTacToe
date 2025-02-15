import { Router } from "express";

import authController from "./controllers/authController";
import userController from "./controllers/userController";

const router = Router();

router.use(authController.ROUTE, authController.router);
router.use(userController.ROUTE, userController.router);

export default router;
