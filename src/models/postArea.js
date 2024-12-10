import { Schema, model, models } from 'mongoose'

const postArea = new Schema({
  ID: {
    type: String,
    required: true,
  },
  Name: {
    type: String
  },
  Room: {
    type: Array
  },
  Color: {
    type: String
  }
})

const PostArea = models.area || model('area', postArea)

export default PostArea