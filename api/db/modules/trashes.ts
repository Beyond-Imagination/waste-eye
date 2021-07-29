import mongoose from 'mongoose'

const trashSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  type: { type: String, required: true },
  coordinates: { type: [Number], index: { type: '2dsphere', sparse: true } },
  address: { type: String, required: true },
  guName: { type: String, required: true },
  image: { type: String, required: true },
  thumbnail: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true }
}, {
  timestamps: true
})

export default mongoose.models.Trashes || mongoose.model('Trashes', trashSchema)
