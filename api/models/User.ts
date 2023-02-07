import { model, Schema } from "mongoose"

interface IUser {
  name: string
  password: string
  email: string
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true }
})

const User = model<IUser>("User", userSchema)

export default User