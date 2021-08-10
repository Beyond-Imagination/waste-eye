import mongoose from 'mongoose'

const URI = process.env.DB_URI || 'ERROR'

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
