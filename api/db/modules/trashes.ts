import { Schema, model } from 'mongoose'

const trashSchema = new Schema({
  type: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
}, {
  timestamps: true
})

export default model('Trashes', trashSchema)
