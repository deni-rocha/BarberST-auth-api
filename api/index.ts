import "dotenv/config"
import express = require("express")
import { Router } from "express"

import cors = require("cors")
import authUsuario from "./routes/authUsuario"
import authColaborador from "./routes/authColaborador"
import loaders from "./loaders"

// configurações
const app = express()
const router = Router()

app.use(cors())
app.use(express.json())
app.use(router)

// rota de autenticação de usuário
app.use("/api/auth", authUsuario)

// rota de autenticação de colaborador
app.use("/api/authColaborador", authColaborador)

// conectar database
loaders()

const porta = process.env.PORT || 4000

app.listen(porta, () => console.log(`tá rodando em http://localhost:${porta}`))
