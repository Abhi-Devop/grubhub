import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAus7nNTXCYktZrAICZmVMeYB8ChoXaZNk",
  authDomain: "grub-hub-c2888.firebaseapp.com",
  projectId: "grub-hub-c2888",
  storageBucket: "grub-hub-c2888.firebasestorage.app",
  messagingSenderId: "537340175373",
  appId: "1:537340175373:web:ac99f7026dee457d466144",
  measurementId: "G-TKNBRKKDWT"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

let analytics;
// Analytics only works in browser environment
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { auth, googleProvider, analytics };
export default app;
