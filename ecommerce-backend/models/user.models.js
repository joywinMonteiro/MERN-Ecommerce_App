import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
})


userSchema.pre('save', async function(next){
    if(this,this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)