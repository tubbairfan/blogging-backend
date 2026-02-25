import { Router } from "express";
import { verifyAdmin } from "../middlewares/auth";
import {getUsers, updateUser,deleteUser } from "../controllers/admin.controller";
import { validateBody } from "../middlewares/validation";
import { updateUserSchema } from "../validators/user.schema";


const router = Router();

router.get("/", verifyAdmin,getUsers)
router.put("/:id", verifyAdmin, validateBody(updateUserSchema), updateUser)
router.delete("/:id", verifyAdmin,deleteUser)

export default router;
