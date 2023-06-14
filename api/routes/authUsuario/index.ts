import { Router } from "express"
import usuario from "../../controllers/usuario.controller"
import { validarRegistro } from "../../middleware/midUsuario"

const router = Router()
// register user
router.post("/registrar", validarRegistro, usuario.registrar)
router.post("/login", usuario.login)

export default router
