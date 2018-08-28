"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// import * as firebaseHelper from 'firebase-functions-helper';
const express = require("express");
const bodyParser = require("body-parser");
const config_1 = require("./config");
const index_1 = require("./routes/index");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(`/api/v${config_1.apiVersion}/student`, index_1.StudentRoutes);
// rest is your functions name, and you will pass app as 
// a parameter
exports.rest = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map