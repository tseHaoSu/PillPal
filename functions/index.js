/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");


const functions = require("firebase-functions");
const admin = require("firebase-admin");
const data = require("./medData.json");
/* eslint-disable */
const cors = require("cors")({ origin: true });

admin.initializeApp();

/* eslint-disable */
exports.importDataToFirestore = functions.https.onRequest(async (req, res) => {
  const db = admin.firestore();
  const batch = db.batch();

  data.forEach((item, index) => {
    const docRef = db.collection("medications").doc(`medication${index}`);
    
    //rewriting the id of the document
    batch.set(docRef, item);
  });
  try {
    await batch.commit();
    console.log("Data imported successfully");
    res.status(200).send("Data imported successfully");
  } catch (error) {
    console.error("Error importing data: ", error);
    res.status(500).send("Error importing data");
  }
});

//get all medications
exports.getMedications = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const db = admin.firestore();
    try {
      const snapshot = await db.collection("medications").get();
      const medications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      res.status(200).json(medications);
    } catch (error) {
      console.error("Error retrieving medications: ", error);
      res.status(500).send("Error retrieving medications");
    }
  });
});

exports.logMedication = functions.https.onRequest(async (req, res) => {
  const db = admin.firestore();
  const medication = req.body;
  if (!medication || !medication.medicationName) {
    res.status(400).send("Invalid medication data");
    return;
  }
  try {
    const docRef = await db.collection("medications").add(medication);
    console.log("Medication added with ID: ", docRef.id);
    res.status(200).send(`Medication added with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding medication: ", error);
    res.status(500).send("Error adding medication");
  }
});