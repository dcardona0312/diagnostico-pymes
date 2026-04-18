const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "diagnostico-pymes-2e83d.firebaseapp.com",
  projectId: "diagnostico-pymes-2e83d",
  storageBucket: "diagnostico-pymes-2e83d.appspot.com",
  messagingSenderId: "918351696404",
  appId: "1:918351696404:web:xxxx"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();