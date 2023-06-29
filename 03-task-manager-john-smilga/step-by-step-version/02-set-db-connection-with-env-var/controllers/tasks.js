const getAllTasks = (req, res) => {
    res.send(`${req.method} all tasks`)
}

const createTask = (req, res) => {
    res.send(`${req.method} new task with body ${JSON.stringify(req.body)}`)
    // res.json(req.body)
}

const getTask = (req, res) => {
    res.send(`${req.method} single task with id=${req.params.id}`)
}

const updateTask = (req, res) => {
    res.send(`${req.method} task with id=${req.params.id}`)
}

const deleteTask = (req, res) => {
    res.send(`${req.method} task with id=${req.params.id}`)
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}