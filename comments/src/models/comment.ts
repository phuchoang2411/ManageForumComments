import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Comment
interface CommentAttrs {
  id: string;
  title: string;
}

// An interface that describes the properties
// that a User Model has
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

// An interface that describes the properties
// that a User Document has
interface CommentDoc extends mongoose.Document {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const CommentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

CommentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  CommentSchema
);

export { Comment };
