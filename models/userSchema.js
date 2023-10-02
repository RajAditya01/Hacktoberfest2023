const jwt = require('jsonwebtoken');
const mongooose = require('mongoose');
const bcrypt = require ('bcryptjs');

const userSchema = new mongooose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


// we are hashing the password
userSchema.pre('save',async function(next){
    if(this.isModified('password')) {
        this.password = bcrypt.hash(this.password,12);
        this.cpassword = bcrypt.hash(this.cpassword,12);
    }
    next();
});

//we generate the tocken
userSchema.methods.generateAuthToken = async function(){
    try{
        let tokenAditya = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:tokenAditya});
        await this.save();
        return tokenAditya;
    }catch(err){
        console.log(err);
    }
}

const user = mongooose.model('USER', userSchema);
module.exports = user;