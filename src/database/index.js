const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost/testandoBanco', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;


module.exports = mongoose;
