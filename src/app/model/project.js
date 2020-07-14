const mongoose = require('../../database')


const ProjectSchema = new mongoose.Schema({
    title:{
        type: String,
        
        
    },
    descrption:{
        type: String,
        require: true
    },
    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],

    createdAt:{
        type: Date,
        default: Date.now,
    }

});




const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project