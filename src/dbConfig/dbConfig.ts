import mongoose from "mongoose";

export async function connect(){
  try {
       mongoose.connect(process.env.MONGO_URL!);
      const connection = mongoose.connection;
      
      connection.on('connected',()=>{
        console.log("Mongodb Connected");
        
      })
      connection.on('error',(err)=>{
        console.log("Mongodb Connection error,please make sure db is up and running:"+ err);
        process.exit();
        
      })

  } catch (error) {
     console.log('something went wrong in connecting Db');
     console.log(error);
     
  }
}