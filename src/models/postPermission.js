import { Schema, model, models } from 'mongoose'

const postPermission = new Schema({
  ID: {
    type: String,
    required: true,
  },
  Name: {
    type: String
  },
  Permission: {
    type: Object
  },
  Router: {
    type: Object
  }
}, { versionKey: false })

const PostPermission = models.permission || model('permission', postPermission)

export default PostPermission