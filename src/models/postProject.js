import { Schema, model, models } from 'mongoose'

const postProject = new Schema({
  ID: {
    type: String,
    required: true,
  },
  Name: {
    type: String
  },
  Room: {
    type: String
  },
  Address: {
    type: String
  },
  Price: {
    type: Number
  },
  Progress: {
    type: String
  },
  Status: {
    type: Boolean
  },
  TimeEnd: {
    type: String
  },
  TimeStart: {
    type: String
  },
  Type: {
    type: String
  },
  Name: {
    type: String
  },
  Detail: {
    type: Object
  },
  Area: {
    type: String
  },
  Student: {
    type: Object
  },
  TeacherHR: {
    type: String
  }
}, { versionKey: false })

const PostProject = models.project || model('project', postProject)

export default PostProject