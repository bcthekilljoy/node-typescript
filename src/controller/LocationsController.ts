import { response } from 'express'
import { Model } from 'mongoose'
import Locations from '../model/Locations'

export const createLocation = async (req, res) => {
  try {
    const { name, rate } = req.body
    const location = new Locations({ name, rate })
    await location.save()
    res.status(201).send('Location added !')
    console.log('Added')
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const fetchLocation = async function (_, res) {
  const all = await Locations.find({})
  if (all == null) {
    res.status(400).send(`No location found`)
  } else {
    res.send(all)
  }
}
