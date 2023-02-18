import { Router } from "express"
import authController from "../../controllers/auth.controller"
import { validarRegistro } from "../../middleware/auth"

const router = Router()
// register user
router.post("/registrar", validarRegistro, authController.registrar)
router.post("/login", authController.login)

export default router
