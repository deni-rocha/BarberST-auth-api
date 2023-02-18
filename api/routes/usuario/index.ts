import usuario from "../../controllers/usuario.controller"
import { Router } from "express"
import checkToken from "../../middleware/token/checkToken"

const router = Router()

router.get("/:id", checkToken, usuario.infoById)

export default router
