import { compare, genSalt, hash } from "bcrypt"
import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import Usuario, { IUsuario } from "../models/Usuario"

const usuarioController = {
  registrar: async (req: Request, res: Response) => {
    const { nome, email, senha, sexo }: IUsuario = req.body

    // criar senha
    const salt = await genSalt(12)
    const hashSenha = await hash(senha, salt)

    // criar usuário
    const usuario = new Usuario({
      nome,
      email,
      senha: hashSenha,
      sexo
    })

    try {
      await usuario.save()
      res.status(201).json({
        message: "Usuário criado com sucesso!"
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message:
          "aconteceu um erro interno no servidor, tente novamente mais tarde!"
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
        message: "senha inválida!"
      })
    }

    try {
      const secret = process.env.SECRET_USUARIO

      const token = sign(
        {
          id: usuario.id
        },
        secret
      )

      // remove a senha do obejeto usuario
      usuario.senha = null

      res.status(200).json({
        message: "Autenticação realizada com sucesso",
        token: token,
        usuario
      })
    } catch (err) {}
  }
}

export default usuarioController
