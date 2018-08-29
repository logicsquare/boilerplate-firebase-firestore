import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

export { db };
