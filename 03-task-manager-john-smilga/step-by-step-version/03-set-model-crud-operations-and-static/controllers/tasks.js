const Task = require('../models/Task')


const getAllTasks = async (req, res) => {
    // find all documents ==> await MyModel.find({})
    try {
        const tasks = await Task.find({})
        res.status(200).json({ tasks })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const createTask = async (req, res) => {        //Validators are in Model!
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const getTask = async (req, res) => {
    // John is using alias and destucturing, then findOne method
    // const { id: taskId } = req.params
    // const task = await Task.findOne({ _id: taskId })
    // I am using await Adventure.findById(id).exec()
    try {
        const taskId = req.params.id

        // John checks for 404 with if statement, refer to his solution for details
        // This doesn't work like this, hence another try catch block
        try {
            const task = await Task.findById(taskId)
            res.status(200).json({ task })
        } catch (error) {       // no match
            res.status(404).json({ msg: `No task with id: ${taskId}` })
        }

    } catch (error) {       // cast error etc., not working with my setup
        res.status(500).json({ msg: error })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const task = await Task.findOneAndDelete({ _id: taskId })

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` })
        }

        res.status(200).json({ task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskId } = req.params
        const task = await Task.findOneAndUpdate(
            { _id: taskId },
            req.body,
            {                   // 3rd param is options, Validators are in Model!
                new: true,      // return updated json
                runValidators: true
            })

        if (!task) {
            return res.status(404).json({ msg: `No task with id: ${taskId}` })
        }

        res.status(200).json({ task })

    } catch (error) {
        res.status(500).json({ msg: error })
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}