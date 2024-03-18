import mongoose from 'mongoose'

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:String,
    coverPicture:String,
    country:String,
    livesin:String,
    worksAt:String,
    relationship:String,
    followers:[],
    followings:[],

},
{timestamps:true});

//Export the model
const User = mongoose.model('User', userSchema)
export default User