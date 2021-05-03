import { createLocation, fetchLocation } from '../controller/LocationsController'
import express from 'express'
const Router = express.Router()

Router.post('/create-location', createLocation)
Router.get('/fetch-location', fetchLocation)

export default Router
