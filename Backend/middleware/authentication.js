const jwt=require("jsonwebtoken");

const SECRET ="12#sy&$fd";

const setUser=(findUser)=>{
const payload={
    _id:findUser._id,
    email:findUser.email
}
// {expiresIn:"1d"}
return jwt.sign(payload,SECRET);
}

const getUser=(token)=>{
return jwt.verify(token,SECRET);
}

module.exports={
    setUser,
    getUser
}