import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new Post
interface PostAttrs {
  id: string;
  title: string;
}

// An interface that describes the properties
// that a User Model has
interface PostModel extends mongoose.Model<PostDoc> {
  build(attrs: PostAttrs): PostDoc;
}

// An interface that describes the properties
// that a User Document has
interface PostDoc extends mongoose.Document {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
}

const postSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

postSchema.statics.build = (attrs: PostAttrs) => {
  return new Post(attrs);
};

const Post = mongoose.model<PostDoc, PostModel>('Post', postSchema);

export { Post };
