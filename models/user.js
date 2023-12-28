import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const UserSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(), // Use a function to generate a new ObjectId
  },
  userId:
  {type: 'string',
    required: [true, "UserId is required!"],
    unique: [true, "UserId already exists!"]
  },
  email: {
    type: String,
    unique: [true, 'Email already exists!'],
    required: [true, 'Email is required!'],
  },
  username: {
    type: String,
    required: false,
    match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
  },
  imageUrl: {
    type: String,
  }
});

const User = models.User || model("User", UserSchema);

export default User;