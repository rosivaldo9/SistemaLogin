const express = require('express');
const authMidewaes = require('../midewares/auth')
const Project = require('../model/project')
const Task = require('../model/task')

const router = express.Router();

router.use(authMidewaes);

router.get ('/', (req, res)=>{
    res.send({ok: true});
})

router.get('/:projectId', async (req, res)=>{
    res.send({user: req.userId})
})

router.post('/', async (req, res)=>{
    res.send({user: req.userId})
})
router.put('/:projectId', async (req, res)=>{
    res.send({user: req.userId})
})

router.delete('/:projectId', async (req, res)=>{
    res.send({user: req.userId})
})

module.exports = app => app.use('/projct', router);