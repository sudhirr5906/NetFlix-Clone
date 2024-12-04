
const user = require("../Models/user")
const bcrypt=require("bcryptjs");
const {setUser,getUser}=require("../middleware/authentication")



const register = async (req, res) => {
    console.log("register api")
    try {
        const { fullName, email, password } = req.body;

        if (!fullName || !email || !password) {
            return res.status(401).json({
                msg: "invalid data",
                success: false
            })
        }
        else {
            const User = await user.findOne({ email });
            if (User) {
                return res.status(401).json({
                    msg: "Already Registered",
                    success: false
                })
            }
            else {
                const salt=await bcrypt.genSalt(10);
                const encryptedPassword= await bcrypt.hash(password,salt);
                await user.create({
                    fullName,
                    email,
                    password:encryptedPassword
                })
                
                return res.status(200).json({
                    msg:"You are Registered Successfully"
                })
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            msg: "Some Thing Went Wrong",
            success: false,
            error:err
        })

    }
}



const login=async(req,res)=>{

    const {email,password}=req.body;
    if(!email || !password){
        return res.status(401).json({
            msg:"please enter all fields",
            success:false
        })
    }
    else{
        const loginUser=await user.findOne({email});
        if(!loginUser){
            return res.status(401).json({
                msg:"You are not registerd user",
                success:false
            })
        }
        else{
            const compPassword=await bcrypt.compare(password,loginUser.password);
            if(!compPassword){
                return res.status(401).json({
                    msg:"Your password is wrong Please enter right password",
                    success:false
                })
            }
            else{
                const token=setUser(loginUser);
              return res.status(200).json({
                msg:"you are loged in",
                success:true,
                token,
                loginUser
              })  
            }
        }
    }
}

const home=async(req,res)=>{
    const verifiedUser =req.user
    console.log(verifiedUser);
    const userDetail=await user.findOne({_id:verifiedUser._id})
    if(!userDetail){
        return res.status(200).json({
            msg:"not regitered",
            success:false
        })
    }
    else{

        return res.status(200).json({
            msg:"verified user",
            success:true,
            userDetail,
        })
    }

}

module.exports={
    register,
    login,
    home,
}
