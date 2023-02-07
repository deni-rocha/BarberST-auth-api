import { infoUser } from "../../controllers/userController"
import { Router } from "express"
import checkToken from "../../middleware/token/checkToken"

const router = Router()

router.get("/:id", checkToken, infoUser)

export default router
