const User = require('../models/User')

const getAllJobs = async (req, res) => {
    res.send(`Get All Items`)
}

const getJob = async (req, res) => {
    res.send(`Get Item with ID: ${req.params.id}`)
}

const createJob = async (req, res) => {
    // test we have user in the request, 
    // i.e. the request has header {"Authorizarition": "Bearer " and valid token}
    // console.log("req.user:", req.user)
    res.json(req.user)
}

const updateJob = async (req, res) => {
    res.send(`Update Item with ID: ${req.params.id} with body: ${JSON.stringify(req.body)}`)
}

const deleteJob = async (req, res) => {
    res.send(`Delete Item with ID: ${req.params.id}`)
}



module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob }