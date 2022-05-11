const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

//mongoose.set("debug", true);

// mongoose
//   .connect("mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${{process.env.MONGO_CLUSTER}}.eqoej.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .catch((error) => console.log(error));