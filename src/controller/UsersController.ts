// import { Request, Response } from 'express'
// import { Mongoose } from 'mongoose'
// import isEmpty from 'is-empty'

// //interacts with Model

// class User {
//   user: null | {
//     name?: string
//     age?: number
//     children?: string[]
//   } = {}
//   constructor({ name, age, children }) {
//     this.user = {
//       name,
//       age,
//       children,
//     }
//   }
//   setUser(params: { name: string; age: number; children: string[] }) {
//     this.user = {
//       ...params,
//     }
//   }
//   updateUser(key: string, value: string | number | string[]) {
//     this.user = {
//       ...this.user,
//       [key]: value,
//     }
//   }

//   getUser() {
//     return this.user
//   }

//   deleteUser() {
//     this.user = null
//   }
// }

// let bryanUser: null | User = null

// export const createUser = (req: Request, res: Response) => {
//   const { name, age, children } = req.body

//   if (!name || !age || !children) {
//     res.status(400).send({
//       error: 'Missing required field',
//     })
//     return
//   }
//   bryanUser = new User({ ...req.body })

//   res.status(200).send({
//     message: 'User successfully created',
//   })
// }

// export const getUser = (req: Request, res: Response) => {
//   console.log('who do I get ', req.params)
//   res.status(200).send({
//     user: bryanUser?.getUser(),
//   })
// }

// export const updateUser = (req: Request, res: Response) => {
//   try {
//     const { key, value } = req.body

//     // if (!isEmpty(bryanUser?.getUser())) {
//     if (bryanUser?.getUser()) {
//       bryanUser?.updateUser(key, value)
//       res.status(200).send({
//         message: 'User updated',
//         user: bryanUser?.getUser(),
//       })
//     } else {
//       throw Error('No User created yet')
//     }
//   } catch (err) {
//     res.status(400).send({
//       error: err.message,
//     })
//   }
// }

// export const deleteUser = (req: Request, res: Response) => {
//   console.log('Who to delete', req.body)
//   if (bryanUser) {
//     bryanUser.deleteUser()
//   }
//   res.status(200).send({
//     message: 'User successfully deleted',
//   })
// }

import { response } from 'express'
import { Model } from 'mongoose'
import Employees from '../model/Users'

export const createEmployee = async function (req, res) {
  try {
    const { first_name, last_name, address, contact_number, emergency } = req.body
    const check = await Employees.findOne({ full_name: `${first_name} ${last_name}` }).exec()
    if (check) {
      console.log(check)
      res.status(400).send(`Employee already exists!`)
    } else {
      const employee = new Employees({ full_name: `${first_name} ${last_name}`, ...req.body })
      await employee.save()
      res.status(201).send('Employee created!')
    }
  } catch (error) {
    res.status(400).send(`Employee already exists! ${error.message}`)
  }
}

export const updateEmployee = async function (req, res) {
  const { _id, field, info } = req.body
  const emp = await Employees.findOne({ _id: _id }).exec()
  if (field == 'first_name') {
    const updated = await Employees.updateOne(
      { _id },
      { [field]: info, full_name: `${info} ${emp?.['last_name']}` }
    )
    console.log('update', updated)
    res.send('User updated')
  } else if (field == 'last_name') {
    const updated = await Employees.updateOne(
      { _id },
      { [field]: info, full_name: `${emp?.['first_name']} ${info}` }
    )
    console.log('update', updated)
    res.send('User updated')
  } else if (field == 'full_name') {
    res.status(400).send(`Please update employee name with first and last name separately`)
  } else {
    const updated = await Employees.updateOne({ _id }, { [field]: info })
    console.log('upqdate', updated)
    res.send('User updated')
  }
}

export const findEmployee = async function (req, res) {
  const result = await Employees.findOne({
    $or: [
      { first_name: req.query.search },
      { last_name: req.query.search },
      { address: req.query.search },
    ],
  }).exec()
  console.log(result)
  if (result == null) {
    res.status(400).send(`No employee found`)
  } else {
    res.send(result)
  }
}

export const filterEmployee = async function (req, res) {
  const key = Object.keys(req.query)[0]
  const value = Object.values(req.query)[0]
  const filter = await Employees.find({ [key]: `${value}` })
    // .populate('address.location')
    .exec()
  console.log(key)
  if (filter == null) {
    res.status(400).send(`No employee found`)
  } else {
    res.send(filter)
  }
}

export const deleteEmployee = async function (req, res) {
  const { info } = req.body
  console.log(info)
  const deleted = await Employees.findOneAndDelete({ _id: info })
  res.send(`Successfully deleted ${deleted}`)
}

export const fetchEmployee = async function (_, res) {
  const all = await Employees.find({})
  if (all == null) {
    res.status(400).send(`No employee found`)
  } else {
    res.send(all)
  }
}
