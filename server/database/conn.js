import mongoose from "mongoose";
const conn=async()=>{
    await mongoose.connect("mongodb+srv://maruthi123:maruthi123@jobminar.4aozhcv.mongodb.net/?retryWrites=true&w=majority")
    .then(()=>console.log("connected to database"))
    .catch((err)=>console.log(`this is the mongoose error ${err}`))
}

export default conn