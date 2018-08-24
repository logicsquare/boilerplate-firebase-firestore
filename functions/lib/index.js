"use strict";
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// import * as firebaseHelper from 'firebase-functions-helper';
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const main = express();
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use("/api/v1", routes_1.app);
// webApi is your functions name, and you will pass main as 
// a parameter
exports.rest = functions.https.onRequest(main);
//# sourceMappingURL=index.js.map