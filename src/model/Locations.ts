import Mongoose from 'mongoose'
const { Schema } = Mongoose

const locationSchema = new Schema({
  name: { type: String, required: true, unique: true, index: true },
  rate: { type: Number, required: true },
})

const Locations = Mongoose.model('Locations', locationSchema)

export default Locations
