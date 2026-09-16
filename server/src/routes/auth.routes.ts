import { Router } from "express";

const router = Router();

import {
  getUserAuthenticated,
  loginController,
  registerController,
  findUser,
  updateUserInfo,
  updateUserRole,
  findMembers,
} from "../controllers/auth.controller";
import { checkAuth } from "../middlewares/auth.middleware";

// register
router.post("/register", registerController);

// login
router.post("/login", loginController);

// authUSer
router.get("/check", checkAuth, getUserAuthenticated);

// admin route to find user data
router.get("/find/:moodleID", checkAuth, findUser);

// admin route to update user data
router.patch("/update", checkAuth, updateUserInfo);

// admin route to update user role
router.patch("/update-role", checkAuth, updateUserRole);

// get list of uers who have website access
router.get("/find-members", checkAuth, findMembers)

export default router;
