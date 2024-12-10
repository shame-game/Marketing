import { Schema, model, models } from 'mongoose'

const postTask = new Schema({
  ID: {
    type: String,
    required: true,
  },
  Name: {
    type: String
  },
  BD: {
    type: String
  },
  School: {
    type: String
  },
  Area: {
    type: String
  },
  Type: {
    type: String
  },
  Address: {
    type: String
  },
  ParentName: {
    type: String
  },
  Phone: {
    type: String
  },
  Email: {
    type: String
  },
  Avt: {
    type: String
  },
  Status: {
    type: String,
  },
  Course: {
    type: Object
  },
  Profile: {
    type: Object
  }
}, { versionKey: false })

const PostTask = models.task || model('task', postTask)

export default PostTask