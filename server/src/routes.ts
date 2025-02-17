import { Router } from "express";

import authController from "./controllers/authController";
import userController from "./controllers/userController";
import lobbyController from "./controllers/lobbyController";

const router = Router();

router.use(authController.ROUTE, authController.router);
router.use(userController.ROUTE, userController.router);
router.use(lobbyController.ROUTE, lobbyController.router);

export default router;
