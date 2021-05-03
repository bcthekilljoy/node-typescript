// import express from 'express'
// import { getUser, createUser, deleteUser, updateUser } from '../controller/UsersController'
// const Router = express.Router()

// /**
//  *
//  * @param { body: { name, age, children } }
//  * @returns { message }
//  */
// Router.post('/create-user', createUser)

// /**
//  *
//  * @param { params: {name} }
//  * @returns { user: { name, age, children }}
//  */
// Router.get('/:name', getUser)

// /**
//  *
//  * @param { body:{name} }
//  * @returns { success }
//  */
// Router.post('/delete-user', deleteUser)

// /**
//  *
//  * @param { body:{name} }
//  * @returns { success }
//  */
// Router.post('/update-user', updateUser)

// export default Router

import {
  createEmployee,
  updateEmployee,
  findEmployee,
  deleteEmployee,
  filterEmployee,
  fetchEmployee,
} from '../controller/UsersController'
import express from 'express'
const Router = express.Router()

Router.post('/create-user', createEmployee)

Router.post('/update-user', updateEmployee)

Router.get('/find-user', findEmployee)

Router.get('/filter', filterEmployee)

Router.patch('/delete-user', deleteEmployee)

Router.get('/fetch-user', fetchEmployee)

export default Router
