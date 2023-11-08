import { Router } from "express";
import { AdminLogin, AdminsignUp, formData, getMyUsers } from "../controllers/Authcontroller.js";
import {  data, postData, userSignUp, voter } from "../controllers/UserController.js";
const route=Router()
route.post('/admin/signup',AdminsignUp)
route.post('/admin/login',AdminLogin)
route.post('/user/signup',userSignUp)
// route.post('/user/login',userSignIn)
route.post('/post/form',postData)
route.get('/getusers/:id',getMyUsers)
route.get('/voter',voter)
route.post('/voterdata',data)
route.get("/form/:id",formData)
export default route
