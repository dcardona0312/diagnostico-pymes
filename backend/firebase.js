const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO",
  projectId: "diagnostico-pymes-2e83d",
  storageBucket: "diagnostico-pymes-2e83d.firebasestorage.app",
  messagingSenderId: "918351696404",
  appId: "1:918351696404:web:deb958cbe4351e51968d01"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();