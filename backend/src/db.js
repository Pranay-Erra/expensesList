// import {MongoClient} from "mongodb";

// let db; 

// async function connectToDB(cb){
//     const url = "mongodb+srv://pranayerra2003:Pranay@cluster0.gmrrjw4.mongodb.net/?retryWrites=true&w=majority";
//     const client = new MongoClient(url);
//     await client.connect();
//     db = client.db("EXPENSE_LIST");
//     cb();
// }

// export {db,connectToDB};

import { MongoClient } from "mongodb";

let db; 

async function connectToDB(cb) {
    const url = "mongodb+srv://pranayerra2003:Pranay@cluster0.gmrrjw4.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db("EXPENSE_LIST");
    console.log("Connected to MongoDB");
    cb();
}

export { db, connectToDB };
