import { Schema, model, models } from 'mongoose'

const postactivity = new Schema({
  action: {
    type: Object,
  },
  actor: {
    type: Object
  },
  target: {
    type: String
  }
}, { timestamps: true })

const PostActivity = models.activity || model('activity', postactivity)

export default PostActivity