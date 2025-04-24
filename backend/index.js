import express, { request, response } from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./Routes/bookRoute.js"
import cors from 'cors'
const app = express();


// Middleware for handling CORS POLICY
// Option 1 : Allow all Origins with Default of cors(*)
app.use(cors());

// allow custom origins

app.use(express.json());
// HTTP ROUTE FOR /


app.get('/',(request,response)=>{
    console.log(request);
    return response.status(234).send('Hello');
});

app.use('/books',bookRoute)

mongoose
.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database");
    app.listen(PORT, ()=>{
        console.log(`App is listening to port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(error);
})

