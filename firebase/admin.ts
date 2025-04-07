import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const apps = getApps();

  if (!apps.length) {
    // Validate Firebase Admin configuration
    if (
      !process.env.FIREBASE_PROJECT_ID ||
      !process.env.FIREBASE_CLIENT_EMAIL ||
      !process.env.FIREBASE_PRIVATE_KEY
    ) {
      console.error(
        "❌ Firebase Admin configuration is invalid. Please check your environment variables."
      );
      throw new Error("Invalid Firebase Admin configuration.");
    }

    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace newlines in the private key
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      }),
    });

    console.log("✅ Firebase Admin SDK initialized successfully.");

    // Test Firestore connection
    console.log("ℹ️ Testing Firestore Admin connection...");
    const db = getFirestore();
    db.collection("test")
      .limit(1)
      .get()
      .then((snapshot) => {
        console.log(
          "✅ Firestore Admin connection verified. Documents:",
          snapshot.docs.map((doc) => doc.data())
        );
      })
      .catch((error) => {
        console.error(
          "❌ Firestore Admin connection failed:",
          error.message || error,
          "\nStack Trace:",
          error.stack
        );
      });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();
