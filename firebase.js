import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC7ibM_dWnupDYpIbTX2c0lfYAXZrpTH7k",
  authDomain: "quakly-ca6c2.firebaseapp.com",
  databaseURL: "https://quakly-ca6c2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "quakly-ca6c2",
  storageBucket: "quakly-ca6c2.appspot.com",
  messagingSenderId: "815018900166",
  appId: "1:815018900166:web:14f8822da3a289640275c7"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth()
const db = firebase.firestore()
db.settings({ experimentalForceLongPolling: true });

export { auth, db };