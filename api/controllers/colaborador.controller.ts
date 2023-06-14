import { compare, genSalt, hash } from "bcrypt"
import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import Colaborador, { IColaborador } from "../models/Colaborador"

const colaboradorController = {
  registrar: async (req: Request, res: Response) => {
    const {
      nome,
      email,
      senha,
      sexo,
      dataDeNascimento,
      foto,
      horario,
      permissao
    }: IColaborador = req.body

    // criar senha
    const salt = await genSalt(12)
    const hashSenha = await hash(senha, salt)

    // criar colaborador
    const colaborador = new Colaborador({
      nome,
      email,
      senha: hashSenha,
      sexo,
      dataDeNascimento,
      foto,
      horario,
      permissao
    })

    try {
      await colaborador.save()
      res.status(201).json({
        message: "Colaborador criado com sucesso!"
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

    // verificar se colaborador já xiste
    const colaborador = await Colaborador.findOne({ email: email })

    if (!colaborador) {
      return res.status(404).json({
        message: "colaborador não encontrado!"
      })
    }

    // verificar se a senha coincidem
    const verificarSenha = await compare(senha, colaborador.senha)

    if (!verificarSenha) {
      return res.status(422).json({
        message: "senha inválida!"
      })
    }

    try {
      const secret = process.env.SECRET_COLABORADOR

      const token = sign(
        {
          id: colaborador.id
        },
        secret
      )

      // remove a senha do obejeto colaborador
      colaborador.senha = null

      res.status(200).json({
        message: "Autenticação realizada com sucesso",
        token: token,
        colaborador
      })
    } catch (err) {}
  }
}

export default colaboradorController
