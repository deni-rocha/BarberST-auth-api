import { Request, Response } from "express"
import Usuario from "../models/Usuario"

const usuario = {
  infoById: async (req: Request, res: Response) => {
    const id = req.params.id

    // verifica se usuário existe
    const usuario = await Usuario.findById(id, "-senha")

    if (!usuario) {
      return res.status(404).json({
        msg: "Usuário não encontrado!"
      })
    }

    res.status(200).json({
      usuario
    })
  }
}

export default usuario
