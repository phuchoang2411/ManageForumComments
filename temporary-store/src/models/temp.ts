import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Temp
interface TempAttrs {
  commentId: string;
  content: string;
  postId: string;
}

// An interface that describes the properties
// that a User Model has
interface TempModel extends mongoose.Model<TempDoc> {
  build(attrs: TempAttrs): TempDoc;
}

// An interface that describes the properties
// that a User Document has
interface TempDoc extends mongoose.Document {
  commentId: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const TempSchema = new mongoose.Schema({
  commentId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
});

TempSchema.statics.build = (attrs: TempAttrs) => {
  return new Temp(attrs);
};

const Temp = mongoose.model<TempDoc, TempModel>('Temp', TempSchema);

export { Temp };
