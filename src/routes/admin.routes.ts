import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth.js";
import {getUsers, updateUser,deleteUser } from "../controllers/admin.controller.js";
import { validateBody } from "../middlewares/validation.js";
import { updateUserSchema } from "../validators/user.schema.js";


const router = Router();

router.get("/", verifyAdmin,getUsers)
router.put("/:id", verifyAdmin, validateBody(updateUserSchema), updateUser)
router.delete("/:id", verifyAdmin,deleteUser)

export default router;
