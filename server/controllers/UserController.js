import mongoose from "mongoose";
import AuthModel from "../models/AuthModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import express from 'express'
import Jwt from 'jsonwebtoken'
const secretKey = 'your-secret-key';
import cors from 'cors'


export const userSignUp = async (req, res) => {
  const { name, email, password, mobile, oid } = req.body; // dailyLocations is allowed to be empty or not provided

  try {
    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res.json({ message: 'Email id already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hash,
      mobile,
      oid,

    });

    await newUser.save();

    const RootUser = await AuthModel.findById(oid);
    // console.log(RootUser)
    if (RootUser) {
      console.log(RootUser, 'if')
      RootUser.users.push(newUser._id); // Push the new user's _id to RootUser's users array
      await RootUser.save();
      return res.json({ message: 'User signup successful' });
    } else {
      console.log(RootUser, "else")
      return res.json({ message: 'RootUser not found' });
    }
  } catch (err) {
    console.error(`Error from user signup controller: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await UserModel.findOne({ email })
    if (checkEmail){
      let checkPassword = checkEmail.password
      if (checkPassword = password) {
        const token = Jwt.sign({ email }, secretKey, { expiresIn: '10h' })
        res.json({ m: "ok", token: token, name: checkEmail.name ,id:checkEmail.id})
      }
      else {
        res.json({ m: "wrong password" })
      }
    }
    else {
      res.json({ m: 'invalid email' })
    }
  }
  catch (err){
    res.json({ m: err.message })
  }
};

export const postData = async (req, res) => {
  try {
    const { name, vid, partno, tel,user } = req.body; // Destructure the data fields from the request body

    // Create a new data object based on the schema
    const newData = {
      name,
      vid,
      partno,
      tel,
      user
  
    };
    // Find the user document by its unique email and update the 'data' field with the new data
    const user1 = await UserModel.findById(id);
    if (!user1) {
      return res.status(404).json({ error: 'User not found' });
    }

    user1.data.push(newData); // Add the new data to the user's 'data' array

    // Save the updated user document
    await user1.save();

    res.json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const voter = async (req, res) => {
//   try {
//     const collection = mongoose.connection.db.collection('voterdata');
//     const pageSize = 1000; // Adjust the page size as needed

//     const page = req.query.page || 1; // Get the requested page from the query parameters

//     const skip = (page - 1) * pageSize;

//     const data = await collection.find({}).skip(skip).limit(pageSize).toArray();

//     res.json({ m: data });
//   } catch (err) {
//     res.json({ m: err.message });
//   }
// };
export const voter = async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('voterdatas');

    // Set the response headers for streaming
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Transfer-Encoding', 'chunked');

    // Use a cursor to stream data
    const cursor = collection.find({}).stream();

    let isFirst = true;

    res.write('['); // Start of the JSON array

    cursor.on('data', (doc) => {
      if (!isFirst) {
        res.write(',\n'); // Add a comma and newline separator for subsequent records
      } else {
        isFirst = false;
      }

      // Send each document as a separate JSON object
      res.write(JSON.stringify({ m: doc }));
    });

    cursor.on('end', () => {
      res.write(']'); // End of the JSON array
      res.end(); // End the response
    });

    cursor.on('error', (err) => {
      console.error(err);
      res.end(); // End the response in case of an error
    });
  } catch (err) {
    console.error(err);
    res.json({ error: 'An error occurred while streaming data.' });
  }
};
export const vid=async(req,res)=>{
  const collection = mongoose.connection.db.collection('voterdatas');
try{
  const datas=await collection.findOne({EPIC_NO:"YOJ8076895"})
  res.json({m:datas})
}
catch(err){
  res.json({m:err.message})
}
}
// export const name=async(req,res)=>{
//   const{name,vid,partNo,age}=req.body
//   const collection = mongoose.connection.db.collection('voterdatas');
// try{
//   const userName=await collection.find({NAME:name}).toArray()
//   const voterid=await collection.find({EPIC_NO:vid}).toArray()
//   const part=await collection.find({PART_NO:partNo}).toArray()
//   const userAge=await collection.find({AGE:age}).toArray()
//  if(userName){
//   res.json({data:userName})
//  }
//  else if(voterid){
//   res.json({data:voterid})
//  }
//  else if(part)
//  {
//   res.json({data:part})
//  }
//  else if(userAge){
//   res.json({data:userAge})
//  }
//  else{
//   res.json({data:'no data found'})
//  }
// }
// catch(err){
//   res.json({m:err.message,msg:'this is the error message '})
// }
// }
// export const 
// export const name = async (req, res) => {
//   const { name, vid, partNo, age } = req.body;
//   const collection = mongoose.connection.db.collection('voterdatas');

//   try {
//     const userName = await collection.find({ NAME: name }).toArray();
//     const voterid = await collection.find({ EPIC_NO: vid }).toArray();
//     const part = await collection.find({ PART_NO: partNo }).toArray();
//     const userAge = await collection.find({ AGE:age }).toArray();

//     if (userName.length > 0) {
//      return res.json({ data: userName });
//     } else if (voterid.length > 0) {
//     return  res.json({ data: voterid });
//     } else if (part.length > 0) {
//     return  res.json({ data: part });
//     } else if (userAge.length > 0) {
//     return  res.json({ data: userAge });
//     } else {
//      return res.json({ data: 'no data found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message, msg: 'An error occurred' });
//   }
// };
export const data = async (req, res) => {
  const {  vid, partNo,house } = req.body;
  const collection = mongoose.connection.db.collection('voterdatas');

  try {
    const query = {}; // Initialize an empty query object

    // if (name) {
    //   query.NAME = name;
    // }
    if (vid) {
      query.EPIC_NO = vid;
    }
    if (partNo) {
      query.PART_NO = partNo;
    }
    // if (age) {
    //   query.AGE = age;
    // }
    if(house){
      query.C_HOUSE_NO = house;
    }
    // if(gender){
    //   query.GENDER=gender
    // }
    const result = await collection.find(query).toArray();
    if (result.length > 0) {
      res.json({ data: result});
    } else {
      res.json({ data: 'no data found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message, msg: 'An error occurred' });
  }
};


