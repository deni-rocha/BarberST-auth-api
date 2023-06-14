import { Request, Response, NextFunction } from "express"
import Colaborador from "../../models/Colaborador"

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
      message: "defina a permissão do colaborador!"
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

  // verificar se colaborador já existe
  const usuarioExiste = await Colaborador.findOne({ email: email })

  if (usuarioExiste) {
    return res.status(422).json({
      message: "email já cadastrado!"
    })
  }

  next()
}

export { validarRegistro }
