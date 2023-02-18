import "dotenv/config"
import express = require("express")
import { Router } from "express"

import cors = require("cors")
import authRouter from "./routes/auth"
import userRouter from "./routes/usuario"
import loaders from "./loaders"

// configurações
const app = express()
const router = Router()

app.use(cors())
app.use(express.json())
app.use(router)

// rota de autenticação
app.use("/api/auth", authRouter)

// rota privada
app.use("/api/user", userRouter)

// conectar database
loaders()

const porta = process.env.PORT || 4000

app.listen(porta, () => console.log(`tá rodando em http://localhost:${porta}`))
