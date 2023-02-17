import { Router } from "express"
import authController from "../../controllers/auth.controller"
import { validateRegister } from "../../middleware/auth"

const router = Router()
// register user
router.post("/register", validateRegister, authController.register)
router.post("/login", authController.login)

export default router
