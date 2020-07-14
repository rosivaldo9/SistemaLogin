const express = require('express');
const User = require('../model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')

const authConfig = require('../../config/auth.json')

const router = express.Router();

function geeneratioToken(param = {}) {
  return jwt.sign({ param }, authConfig.secret, {
    expiresIn: 86400
  })
}


router.post('/register', async (req, res) => {
  const { email } = req.body;
  try {
    if (await User.findOne({ email }))
      return res.status(409).send({ error: "usuario ja existe" })


    const user = await User.create(req.body);
    user.password = undefined;

    return res.send({
      user, token: geeneratioToken({ id: user.id }),
    });
  } catch (err) {
    res.status(400).send("error: " + err);
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(400).send({ error: "Usuario não existe" })

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: "senha invalida" })



  user.password = undefined;
  res.send({
    user,
    token: geeneratioToken({ id: user.id })
  })

})

router.post('/forgot_password', async (req, res)=>{
  const {email}= req.body;

  try{
   const user = await User.findOne({email});
   if(!user)
   res.status(400).send({error: 'email não cadastrado'})

   const token = crypto.randomBytes(20).toString('hex');

   const now = new Date();
   now.setHours(now.getHours()+1);

   await User.findByIdAndUpdate(user.id, {
     $set: {
     passwordResetToken: token,
     passwordResetExpires: now,
     }
   });

   mailer.sendMail({
     to: email,
     from: 'rosivaldoedeus@gmail.com',
     template: 'auth/forgot_password',
     context: {token},
   }, (err) => {
     if(err)
     return res.status(400).send({error: 'erro não sei qual'+ err + user.email})
   

     return res.send();
   
   })

  }catch(err){
    res.status(400).send({error: err})
    console.log(err)
  }
})

router.post('/reset_password', async(req, res)=>{
  const {email, token, password} = req.body;

  try{
    const user = await User.findOne({email})
    .select('+passwordResetToken passwordResetExpires')

    if(!user)
    res.status(400).send({error: 'email não cadastrado'})

    if(token !== user.passwordResetToken)
    return res.status(400).send({ error: 'token invalid'})

    const now = new Date();
    if(now >user.passwordResetExpires)
    return res.status(400).send({ error: 'token expirado'})

    user.password = password;

    await user.save();

    res.send();
  }catch(err){
    res.status(400).send({error: 'erro  '+err})
  }
})

module.exports = app => app.use('/auth', router)