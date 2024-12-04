const mongoose=require("mongoose");

const dbConnection= async(url)=>{
    return await mongoose.connect(url)
    .then(()=>{
        console.log("DataBase Connected")
    })
    .catch(()=>{
        console.log("Some error occur");
    })
}

module.exports=dbConnection;