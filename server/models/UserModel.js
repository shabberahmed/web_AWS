import mongoose from "mongoose";

const data = new mongoose.Schema({
  name: String,
  vid: String,
  partno: String,
  tel: String,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  mobile: String,
  oid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Authcollection',
  },
  data: [data],
});

const UserModel = mongoose.model("userCollection", userSchema);
export default UserModel;