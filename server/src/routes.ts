import { Router } from "express";

import authController from "./controllers/authController";
import userController from "./controllers/userController";
import lobbyController from "./controllers/lobbyController";
import gameController from "./controllers/gameController";

const router = Router();

router.use(authController.ROUTE, authController.router);
router.use(userController.ROUTE, userController.router);
router.use(lobbyController.ROUTE, lobbyController.router);
router.use(gameController.ROUTE, gameController.router);

export default router;
