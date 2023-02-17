import user from "../../controllers/user.controller"
import { Router } from "express"
import checkToken from "../../middleware/token/checkToken"

const router = Router()

router.get("/:id", checkToken, user.infoById)

export default router
