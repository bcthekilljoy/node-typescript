import Mongoose from 'mongoose'
const { Schema } = Mongoose

const employeeSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  full_name: { type: String, unique: true, index: true },
  address: {
    street: { type: String },
    location: { type: Mongoose.Types.ObjectId, ref: 'Locations' },
  },
  contact_number: { type: String, required: true },
  emergency: {
    contact_number: { type: String },
    contact_person: { type: String },
  },
  project: Mongoose.Types.ObjectId,
  salary_deduction: {
    sss: Number,
    philhealth: Number,
    pagibig: Number,
  },
  job: Mongoose.Types.ObjectId,
})

const Employees = Mongoose.model('Employees', employeeSchema)

export default Employees
