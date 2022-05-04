import mongoose, {ConnectOptions} from "mongoose";

export const connect = () => {

  mongoose
    .connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error: any) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });

};