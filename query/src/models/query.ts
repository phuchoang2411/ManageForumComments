import mongoose from 'mongoose';

// An interface that describes the properties
// that are required to create a new query
interface queryAttrs {
  postId: string;
  title?: string;
  postContent?: string;
  comment?: [
    {
      commentId: string;
      content: string;
      status: string;
    }
  ];
}

// An interface that describes the properties
// that a User Model has
interface queryModel extends mongoose.Model<queryDoc> {
  build(attrs: queryAttrs): queryDoc;
}

// An interface that describes the properties
// that a User Document has
interface queryDoc extends mongoose.Document {
  postId: string;
  title?: string;
  postContent?: string;
  comment?: [
    {
      commentId: string;
      content: string;
      status: string;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

const querySchema = new mongoose.Schema({
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
  comment: {
    type: [
      {
        commentId: String,
        content: String,
        status: String,
      },
    ],
    required: false,
  },
});

querySchema.statics.build = (attrs: queryAttrs) => {
  return new Query(attrs);
};

const Query = mongoose.model<queryDoc, queryModel>('query', querySchema);

export { Query };
