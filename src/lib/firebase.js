// importing required firebase modules for application initialization and analytics
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

/**
 * NOTE: application-specific firebase configuration object
 * environment variables are utilized to secure sensitive credentials and enable multi-stage deployments
 */
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// bootstrap firebase services with the provided configuration
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// exposing the firebase auth instance for application-wide authentication management
export const auth = getAuth(app); 

export default app;