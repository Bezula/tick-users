import mongoose from "mongoose";

interface GroupAttrs {
  name: string;
}

type GroupDoc = {
  name: string;
} & mongoose.Document;

type GroupModel = {
  build(attrs: GroupAttrs): GroupDoc;
} & mongoose.Model<GroupDoc>;

const groupSchema = new mongoose.Schema<GroupDoc>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

groupSchema.statics.build = (attrs: GroupAttrs) => {
  return new Group(attrs);
};

const Group = mongoose.model<GroupDoc, GroupModel>("Group", groupSchema);

export { Group };
