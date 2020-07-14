const mongoose = require('../../database')
const bcrypt = require('bcryptjs')


const UserSchema = new mongoose.Schema({
    nome:{
        type: String,
        
        
    },
    email:{
        type: String,
        lowercase:true,
        unique:true,
        required: true,
        select: false
    },
    passwordResetToken:{
        type: String,
        select: false
    },
    passwordResetExpires:{
        type: String,
        select: false
    },
    password:{
        type: String,
        unique:true,
        required: true,
        select: false
    }
});


UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});


const User = mongoose.model("User", UserSchema)

module.exports = User;