import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Post
interface PostAttrs {
  postId: string;
  title?: string;
  postContent?: string;
}

// An interface that describes the properties
// that a User Model has
interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

// An interface that describes the properties
// that a User Document has
interface PostDoc extends mongoose.Document {
  postId: string;
  title?: string;
  postContent?: string;
  createdAt: string;
  updatedAt: string;
}

const postSchema = new mongoose.Schema({
  postId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  postContent: {
    type: String,
    required: false,
  },
});

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };
