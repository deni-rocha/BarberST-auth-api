import express = require("express")
import { Router } from "express"
import dotenv = require("dotenv")
import cors = require("cors")
import mongoose from "mongoose"
import authRouter from "./routes/auth"
import userRouter from "./routes/user"

// configurações
dotenv.config()
const app = express()
const router = Router()

app.use(cors())
app.use(express.json())
app.use(router)

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

// rota de autenticação
app.use("/api/auth", authRouter)

// rota privada
app.use("/api/user", userRouter)

// connect database
void (async () => {
  try {
    mongoose.set("strictQuery", true)

    const response = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.sq7oujl.mongodb.net/?retryWrites=true&w=majority`
    )

    console.log("deu bom")
  } catch (error) {
    console.log("deu ruim")
  }
})()

const porta = process.env.PORT || 4000

app.listen(porta, () => console.log("tá rodando na porta " + porta))
