import { Document, Model, model, Schema } from "mongoose";

export interface IMessage extends Document {
  user: string;
  type: string;
  message: string
}

const messageSchema: Schema = new Schema({
  user: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
  },
  message: {
      type: String,
      required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Message: Model<IMessage> = model("Message", messageSchema);

export default Message;