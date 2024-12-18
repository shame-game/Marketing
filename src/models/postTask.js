import { Schema, model, models } from 'mongoose'

const postTask = new Schema({
  name: {
    type: String,
  },
  project: {
    type: Schema.Types.ObjectId,
  },
  detail: {
    type: String,
  },
  doer: {
    type: Schema.Types.ObjectId,
  },
  checker: {
    type: Schema.Types.ObjectId,
  },
  startDatel: {
    type: Date,
  },
  endDatel: {
    type: Date,
  },
  notes: {
    type: String,
  },
  doerDone: {
    type: Boolean
  },
  checkerDone: {
    type: Boolean
  },
  linkDrive: {
    type: String
  },
  taskCategory: {
    type: Schema.Types.ObjectId,
  }
})

const PostTask = models.task || model('task', postTask)

export default PostTask