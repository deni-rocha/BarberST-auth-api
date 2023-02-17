import { Request, Response, NextFunction } from "express"
import User from "../../models/User"

const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, role, password, confirmPassword } = req.body

  if (!name) {
    return res.status(422).json({
      message: "o nome é obrigatório!"
    })
  }
  if (!email) {
    return res.status(422).json({
      message: "o email é obrigatória!"
    })
  }
  if (!role) {
    return res.status(422).json({
      message: "defina perfil do usuário!"
    })
  }
  if (!password) {
    return res.status(422).json({
      message: "a senha é obrigatória!"
    })
  }
  if (password !== confirmPassword) {
    return res.status(422).json({
      message: "as senhas não conferem!"
    })
  }

  // check if user exists
  const userExists = await User.findOne({ email: email })

  if (userExists) {
    return res.status(422).json({
      message: "email já cadastrado!"
    })
  }

  next()
}

export { validateRegister }
