import { compare, genSalt, hash } from "bcrypt"
import { Request, Response } from "express"
import { sign } from "jsonwebtoken"
import User from "../models/User"

const register = async (req: Request, res: Response) => {
  const { name, email, password, confirmPassword } = req.body

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

  // create password
  const salt = await genSalt(12)
  const passwordHash = await hash(password, salt)

  // create user
  const user = new User({
    name,
    email,
    password: passwordHash
  })

  try {
    await user.save()
    res.status(201).json({
      msg: "Usuário criado com sucesso!"
    })
  } catch (error) {
    res.status(500).json({
      msg: "aconteceu um erro interno no servidor, tente novamente mais tarde!"
    })
  }
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  if (!email) {
    return res.status(422).json({
      message: "o email é obrigatória!"
    })
  }
  if (!password) {
    return res.status(422).json({
      message: "a senha é obrigatória!"
    })
  }

  // check if user exists
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({
      message: "usuário não encontrado!"
    })
  }

  // check if password match
  const checkPassword = await compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({
      msg: "senha inválida!"
    })
  }

  try {
    const secret = process.env.SECRET

    const token = sign(
      {
        id: user.id
      },
      secret
    )

    res.status(200).json({
      msg: "Autenticação realizada com sucesso",
      token
    })
  } catch (err) {}
}

export { register, login }