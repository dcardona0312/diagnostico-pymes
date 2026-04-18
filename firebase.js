// CONFIG REAL (la tuya)
const firebaseConfig = {
  apiKey: "AIzaSyCavRPIHaJ4R_jScWoPRyv8pEuoPIonvP0",
  authDomain: "diagnostico-pymes-2e83d.firebaseapp.com",
  projectId: "diagnostico-pymes-2e83d",
  storageBucket: "diagnostico-pymes-2e83d.appspot.com",
  messagingSenderId: "918351696404",
  appId: "1:918351696404:web:deb958cbe4351e51968d01"
};

// INICIALIZAR (FORMA V8)
firebase.initializeApp(firebaseConfig);

// 👇 ESTO ES LO IMPORTANTE
const auth = firebase.auth();
const db = firebase.firestore();