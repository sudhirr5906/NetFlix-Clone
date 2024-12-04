const {getUser}=require("./authentication");

const checkAuth=(req,res,next)=>{
    console.log("authorize",req.headers["authorization"]);
    const authorize=req.headers["authorization"];
    if(!authorize){
        return res.status(400).json({
            msg:"user Not found",
            success:false
        })
    }
    else{
        const token=authorize.split("Bearer ")[1];
        const verifiedUser=getUser(token);
        if(verifiedUser){
            req.user=verifiedUser;
            next()
        }
        else{
            return res.status(400).json({
                msg:"user Not found",
                success:false
            })
        }
    }
}

module.exports={
    checkAuth
};