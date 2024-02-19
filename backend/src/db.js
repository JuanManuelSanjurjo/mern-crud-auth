import mongoose from "mongoose";

async function connectDB(){
    try{
        await mongoose.connect("mongodb://localhost/merndnfazt")
        console.log("Mongo Database connected")
    }catch(e){
        console.log(e)
    }
}


export default connectDB