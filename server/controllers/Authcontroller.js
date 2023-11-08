import AuthModel from "../models/AuthModel.js";
import bcrypt from 'bcrypt'
const secretKey = 'your-secret-key';
import  Jwt  from "jsonwebtoken";
import UserModel from "../models/UserModel.js";

// Signup Route
export const AdminsignUp= async (req, res) => {
  const { name, email, password, mobile } = req.body;

  try {
    // Check if the email is already in use
    const existingUser = await AuthModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered.' });
    }
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new AuthModel({
      name,
      email,
      password: hashedPassword,
      mobile,
    });

    await newUser.save();


    res.status(201).json({m:'ok' });
  } catch (error) {
    res.status(500).json({ message:error.message});
  }
};

// Login Route
export const AdminLogin= async (req, res) => {
  const { email, password } = req.body;
const ifUser=await UserModel.findOne({email})
  const checkEmail=await AuthModel.findOne({email})
try{
  if(checkEmail){
    let checkPassword=await bcrypt.compare(password,checkEmail.password)
    if(checkPassword){
      const token=Jwt.sign({email},secretKey,{expiresIn:'10h'})
      res.json({m:"ok",token:token,role:'admin',id:checkEmail.id})
    }
    else{
      res.json({m:"wrong password"})
    }
  }
  else if(ifUser){
    let checkPassword=await bcrypt.compare(password,ifUser.password)

    if(checkPassword){
      const token=Jwt.sign({email},secretKey,{expiresIn:'10h'})
      res.json({m:"ok",token:token,role:'user',id:ifUser.id,user:ifUser.name})
    }
    else{
      res.json({m:"wrong password "})
    }

  }
  else{
    res.json({m:'invalid email'})
  }
}
catch(err){
  res.json({m:err.message})
}
};
export const getMyUsers = async (req, res) => {
  const oid = req.params.id;

  try {
    const users = await UserModel.find({ oid }).populate('oid');
    res.json({ message: 'ok', data: users });
  } catch (err) {
    res.json({ message: 'Error occurred while fetching users.' });
  }
};
export const formData = async (req, res) => {
  const oid = req.params.id;

  try {
    const users = await UserModel.find({ oid }).populate('oid');
    const responseData = users.map(user => {
      if (user.data.length > 0) {
        return user.data[0]; // Assuming you only want the first data entry
      } else {
        return {}; // Return an empty object if there's no data
      }
    });

    res.json({ message: 'ok', data: responseData });
  } catch (err) {
    res.json({ message: 'Error occurred while fetching users.' });
  }
};
