import mongoose from "mongoose";
import log from "../logger";

function connect() {
  const dbUri = "mongodb://root:example@localhost:27017"
  return mongoose
    .connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then( () => {
        log.info("db connected")
    })
}

export default connect;