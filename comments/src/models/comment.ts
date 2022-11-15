import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Comment
interface CommentAttrs {
  commentId: string;
  content: string;
  postId: string;
}

// An interface that describes the properties
// that a User Model has
interface CommentModel extends mongoose.Model<CommentDoc> {
  build(attrs: CommentAttrs): CommentDoc;
}

// An interface that describes the properties
// that a User Document has
interface CommentDoc extends mongoose.Document {
  commentId: string;
  postId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

const CommentSchema = new mongoose.Schema({
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

CommentSchema.statics.build = (attrs: CommentAttrs) => {
  return new Comment(attrs);
};

const Comment = mongoose.model<CommentDoc, CommentModel>(
  'Comment',
  CommentSchema
);

export { Comment };
