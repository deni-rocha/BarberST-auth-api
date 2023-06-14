import { Request, Response, NextFunction } from "express"
import Usuario from "../../models/Usuario"

const validarRegistro = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { nome, email, permissao, senha, confirmarSenha } = req.body

  if (!nome) {
    return res.status(422).json({
      message: "o nome é obrigatório!"
    })
  }
  if (!email) {
    return res.status(422).json({
      message: "o email é obrigatória!"
    })
  }
  if (!permissao) {
    return res.status(422).json({
      message: "defina perfil do usuário!"
    })
  }
  if (!senha) {
    return res.status(422).json({
      message: "a senha é obrigatória!"
    })
  }
  if (senha !== confirmarSenha) {
    return res.status(422).json({
      message: "as senhas não conferem!"
    })
  }

  // verificar se usuário já existe
  const usuarioExiste = await Usuario.findOne({ email: email })

  if (usuarioExiste) {
    return res.status(422).json({
      message: "email já cadastrado!"
    })
  }

  next()
}

export { validarRegistro }
