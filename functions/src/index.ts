import * as functions from "firebase-functions";
// import * as firebaseHelper from "firebase-functions-helper";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import { apiVersion } from "./config"

import { routes } from "./routes/index";

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())

app.use(`/api/v${apiVersion}`, routes);
// rest is your functions name, and you will pass app as 
// a parameter
export const rest = functions.https.onRequest(app);
