import mongoose from "mongoose";
import { Role } from "./role";

type UserAttrs = {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  role: Role;
  group?: mongoose.Schema.Types.ObjectId;
  phone?: string;
  avatarUrl?: string;
};

type UserDoc = {
  email: string;
  firstName: string;
  lastName: string;
  age: number;
  role: Role;
  group?: mongoose.Schema.Types.ObjectId;
  phone?: string;
  avatarUrl?: string;
} & mongoose.Document;

type UserModel = {
  build(attrs: UserAttrs): UserDoc;
} & mongoose.Model<UserDoc>;

const userSchema = new mongoose.Schema<UserDoc>(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["administrator", "family-member"],
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
