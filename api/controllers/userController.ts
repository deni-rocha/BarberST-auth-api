import { Request, Response } from "express"
import User from "../models/User"

const infoUser = async (req: Request, res: Response) => {
  const id = req.params.id

  // check if user exists
  const user = await User.findById(id, "-password")

  if (!user) {
    return res.status(404).json({
      msg: "Usuário não encontrado!"
    })
  }

  res.status(200).json({
    user
  })
}

export { infoUser }
