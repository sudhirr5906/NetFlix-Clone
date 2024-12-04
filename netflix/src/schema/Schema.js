import * as YUP from "yup"


export const registerSchema=YUP.object({
fullName:YUP.string().min(3).max(25).required(),
email:YUP.string().min(10).max(30).required(),
password:YUP.string().min(5).max(20).required()
})
export const loginSchema=YUP.object({
    email:YUP.string().min(10).max(30).required(),
    password:YUP.string().min(5).max(20).required()
    })
