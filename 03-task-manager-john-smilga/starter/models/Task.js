const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    // name: String, completed: Boolean
    name: {
        type: String,
        required: [true, 'Please enter name'],
        trim: true,  // fix entries like '    Kur    ',
        maxlength: [20, 'Name cannot exceed 20 characters']
    },
    completed: {
        type: Boolean,
        default: false
    }
})

//The first argument is the singular name of the collection your model is for. 
// Mongoose automatically looks for the plural, lowercased version of your model name. 
// Thus, for the example below, the model Task is for the tasks collection in the database.

module.exports = mongoose.model('Task', TaskSchema)