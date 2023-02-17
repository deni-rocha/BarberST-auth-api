import mongoose from "mongoose"
import dotenv = require("dotenv")

dotenv.config()

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const connectDB = async (): Promise<void> => {
  try {
    mongoose.set("strictQuery", true)

    await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.sq7oujl.mongodb.net/auth-db?retryWrites=true&w=majority`
    )

    console.log("banco conectado")
  } catch (error) {
    console.log("banco não conectado", error)
  }
}

export default connectDB
