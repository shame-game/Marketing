import { Schema, model, models } from 'mongoose'

const postInvoices = new Schema({
  StudentID: {
    type: String,
    required: true,
  },
  CourseID: {
    type: String,
    required: true,
  },
  Amount_due: {
    type: Number,
    required: true,
  },
  Amount_paid: {
    type: Number
  },
  Final_amount_due: {
    type: Number
  },
  Discount: {
    type: Object
  },
  Status: {
    type: Boolean
  },
  Payment_method: {
    type: Number
  },
  Note: {
    type: String
  }
}, { timestamps: true, versionKey: false })

const PostInvoices = models.invoices || model('invoices', postInvoices)

export default PostInvoices