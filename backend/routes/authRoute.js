import express from "express";
import { registerController, loginController,forgotPasswordController, testController } from "../controllers/authController.js";
import { requireSignIn, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();





// REGISTER || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//forgot password
router.post("/forgot-password", forgotPasswordController);

// TEST ROUTE
router.get("/test", requireSignIn, isAdmin, testController); // Ensure requireSignIn is before isAdmin

export default router;
