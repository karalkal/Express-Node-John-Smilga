const express = require('express')
const router = express.Router()

const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks')

router.get('/', getAllTasks)

router.post('/', createTask)

router.get('/:id', getTask)

 //UPDATE with PATCH
router.patch('/:id', updateTask)
// router.put('/:id', updateTask)

router.delete('/:id', deleteTask)

module.exports = router