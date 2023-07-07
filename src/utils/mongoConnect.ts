// import * as mongoose from "mongoose";

// const conn = {
//   instance: mongoose,
//   isConnected: false,
// };

// export const dbConnect = async (): Promise<mongoose.Mongoose> => {
//   if (conn.isConnected) return conn.instance;
//   mongoose.set("strictQuery", false);
//   const db = await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
//   conn.isConnected = db.connections[0].readyState === 1;
//   conn.instance = db;
//   return db;
// };

// (async () => {
//   const db = await dbConnect();
//   const connection: mongoose.Connection = db.connection;
//   connection.on("connected", () => {
//     console.log("MONGO CONECTADO");
//   });

//   connection.on("error", (err: Error) => {
//     console.log(err);
//   });
// })();
