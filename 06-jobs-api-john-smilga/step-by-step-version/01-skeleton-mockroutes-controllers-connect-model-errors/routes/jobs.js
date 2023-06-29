const express = require('express')

const router = express.Router()

const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require('../controllers/jobs')


//GET all
router.route('/').get(getAllJobs)
// GET single
router.route('/:id').get(getJob)
//POST (create)
router.route('/').post(createJob)
//PATCH (modify by ID)
router.route('/:id').patch(updateJob)
// DELETE
router.route('/:id').delete(deleteJob)


module.exports = router
