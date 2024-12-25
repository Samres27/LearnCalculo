
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
//const fs= require('fs');
import * as fs from 'node:fs';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: process.env.USER_API_Firebase,
  authDomain: "calculando-f8af8.firebaseapp.com",
  projectId: "calculando-f8af8",
  storageBucket: "calculando-f8af8.firebasestorage.app",
  messagingSenderId: "68303837221",
  appId: "1:68303837221:web:c75000aa388ef9360947cc"
};


const app = initializeApp(firebaseConfig);
// import { getDatabase, ref, set } from "firebase/database";

// const db = getDatabase(app);

// function writeUserData(data) {
//   set(ref(db, 'preguntas/'), data);
// }
import { getFirestore, doc, setDoc } from "firebase/firestore";  

const db = getFirestore(app);

async function writeUserData(idUnico,data) {
    //console.log(idUnico,data)
  await setDoc(doc(db, "preguntas", idUnico.toString()),{ "preguntas":data});
}
fs.readFile('preguntas.json', function(err,data) { 

    if (err) throw err; 

    const books = JSON.parse(data);
    books.forEach(element => {
        console.log(element.preguntas,element.area);    
        writeUserData(element.area,element.preguntas);
        
    });  
  
     
}); 
 
