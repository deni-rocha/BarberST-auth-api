import express = require("express")
import { Router, Response, Request } from "express"
import dotenv = require("dotenv")
import cors = require("cors")

// configurações
dotenv.config()
const app = express()
const router = Router()

app.use(cors())
app.use(express.json())
app.use(router)

// rotas
router.get("/", (req: Request, res: Response) => {
  res.send({
    name: "estrutura base, Node.js para vercel",
    idade: 22
  })
})

const porta = process.env.PORT || 4000

app.listen(porta, () => console.log("tá rodando na porta " + porta))
