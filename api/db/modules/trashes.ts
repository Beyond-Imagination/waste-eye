import mongoose from 'mongoose'

const trashSchema = new mongoose.Schema({
  type: { type: String, required: true },
  address: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
}, {
  timestamps: true
})

export default mongoose.models.Trashes || mongoose.model('Trashes', trashSchema)
