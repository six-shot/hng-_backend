const Resources = require('../models/resources')
const mongoose = require('mongoose')

// get all resources
const getResources = async (req, res) => {
  const resources = await Resources.find({}).sort({createdAt: -1})

  res.status(200).json(resources)
}

// get a resources
const getResource = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No Resources'})
  }

  const resources = await Resources.findById(id)

  if (!resources) {
    return res.status(404).json({error: 'No Resources'})
  }

  res.status(200).json(resources)
}

// create a new workout
const createResources = async (req, res) => {
  const {title, load, reps} = req.body

  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!load) {
    emptyFields.push('load')
  }
  if (!reps) {
    emptyFields.push('reps')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
  }

  // add to the database
  try {
    const resources = await Resources.create({ title, load, reps })
    res.status(200).json(resources)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a workout
const deleteResources = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const resources = await Resources.findOneAndDelete({_id: id})

  if(!resources) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(resources)
}

// update a workout
const updateResources = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such resources'})
  }

  const resources= await Resources.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!resources) {
    return res.status(400).json({error: 'No such resources'})
  }

  res.status(200).json(resources)
}

module.exports = {
  getResource,
  getResources,
  createResources,
  deleteResources,
  updateResources
}