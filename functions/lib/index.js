"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// import * as firebaseHelper from 'firebase-functions-helper';
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes");
const main = express();
main.use(bodyParser.json());
main.use(bodyParser.urlencoded({ extended: false }));
main.use("/api/v1", routes_1.app);
// rest is your functions name, and you will pass main as 
// a parameter
exports.rest = functions.https.onRequest(main);
//# sourceMappingURL=index.js.map