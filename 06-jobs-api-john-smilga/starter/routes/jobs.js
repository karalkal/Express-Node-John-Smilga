const express = require('express')

const router = express.Router()

const {
  createJob,
  deleteJob,
  getAllJobs,
  updateJob,
  getJob,
} = require('../controllers/jobs')

// SHORTHAND
// router.route('/').post(createJob).get(getAllJobs)
// router.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)


//GET all
router.get('/', getAllJobs)
// GET single
router.get('/:id', getJob)
//POST == create
router.post('/', createJob)
//PATCH (modify by ID)
router.patch('/:id', updateJob)
// DELETE
router.delete('/:id', deleteJob)


module.exports = router
