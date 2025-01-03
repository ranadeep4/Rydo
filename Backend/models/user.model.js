const mongoose = require('mongoose')
const bcrypt = require('bcrypt')    
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First name must be atleast 3 characters long.'],
        },
        lastname:{
            type:String,
            minlength:[3,'Last name must be atleast 3 characters long.'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        // match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address.'],
        minlength:[5,'Email must be atleast 5 characters long'],
    },
    password:{
        type:String,
        required:true,
        select:false,
        // minlength:[8,'Password must be atleast 8 characters long.'],
        // match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        // message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
    },
    socketId:{
        type:String,
        required:true,
        unique:true
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET)
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}


const userModel = mongoose.model('user',userSchema);

mongoose.model.exports = userModel;