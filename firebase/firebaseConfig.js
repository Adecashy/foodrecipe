import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyD97EYsGLyr6pHbdX06C5tpHGVOYxteAsw",
    authDomain: "darescious.firebaseapp.com",
    projectId: "darescious",
    storageBucket: "darescious.firebasestorage.app",
    messagingSenderId: "1071494889731",
    appId: "1:1071494889731:web:e0c6368bf1145696d3e936"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);