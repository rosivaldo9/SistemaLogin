const express = require('express')
const bodyParser = require('body-parser')
require('./database/index')

const app =  express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

/*app.get('/', (req, res)=>{
    res.send('ok')
})*/

require('../src/app/Controller/authController')(app);
require('../src/app/Controller/projectController')(app);

app.listen(3001)

module.exports=app;

