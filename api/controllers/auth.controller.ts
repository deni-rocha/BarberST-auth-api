import { compare, genSalt, hash } from "bcrypt"
import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import Usuario from "../models/Usuario"

const authController = {
  registrar: async (req: Request, res: Response) => {
    const { nome, email, permissao, senha } = req.body

    // criar senha
    const salt = await genSalt(12)
    const hashSenha = await hash(senha, salt)

    // criar usuário
    const usuario = new Usuario({
      nome,
      email,
      permissao,
      senha: hashSenha
    })

    try {
      await usuario.save()
      res.status(201).json({
        msg: "Usuário criado com sucesso!"
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        msg: "aconteceu um erro interno no servidor, tente novamente mais tarde!"
      })
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, senha } = req.body

    if (!email) {
      return res.status(422).json({
        message: "o email é obrigatória!"
      })
    }
    if (!senha) {
      return res.status(422).json({
        message: "a senha é obrigatória!"
      })
    }

    // verificar se usuário já existe
    const usuario = await Usuario.findOne({ email: email })

    if (!usuario) {
      return res.status(404).json({
        message: "usuário não encontrado!"
      })
    }

    // verificar se a senha coincidem
    const verificarSenha = await compare(senha, usuario.senha)

    if (!verificarSenha) {
      return res.status(422).json({
        msg: "senha inválida!"
      })
    }

    try {
      const secret = process.env.SECRET

      const token = sign(
        {
          id: usuario.id
        },
        secret
      )

      res.status(200).json({
        msg: "Autenticação realizada com sucesso",
        token
      })
    } catch (err) {}
  }
}

export default authController
