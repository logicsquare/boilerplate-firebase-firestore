// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as functions from 'firebase-functions';
// import * as firebaseHelper from 'firebase-functions-helper';
import * as express from 'express';
import * as bodyParser from "body-parser";

import { app } from "./routes";

const main = express();

main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));

main.use("/api/v1", app);

// webApi is your functions name, and you will pass main as 
// a parameter
export const rest = functions.https.onRequest(main);