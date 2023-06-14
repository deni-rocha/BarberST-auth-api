import { Router } from "express"
import colaborador from "../../controllers/colaborador.controller"
import { validarRegistro } from "../../middleware/midColaborador"

const router = Router()
// register user
router.post("/registrar", validarRegistro, colaborador.registrar)
router.post("/login", colaborador.login)

export default router
