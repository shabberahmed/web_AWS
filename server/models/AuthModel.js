import mongoose from "mongoose";

const AuthSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  mobile: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userCollection",
    },
  ],
});

AuthSchema.set("strictPopulate", false);

const AuthModel = mongoose.model("Authcollection", AuthSchema);
export default AuthModel;
