const User = require('../models/User')

const getAllJobs = async (req, res) => {
    res.send(`Get All Items`)
}

const getJob = async (req, res) => {
    res.send(`Get Item with ID: ${req.params.id}`)
}

const createJob = async (req, res) => {
    res.send(`Create Item with body: ${JSON.stringify(req.body)}`)
}

const updateJob = async (req, res) => {
    res.send(`Update Item with ID: ${req.params.id} with body: ${JSON.stringify(req.body)}`)
}

const deleteJob = async (req, res) => {
    res.send(`Delete Item with ID: ${req.params.id}`)
}



module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }