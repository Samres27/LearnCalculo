const { initializeApp } = require("firebase/app");


const firebaseConfig = {
    apiKey:process.env.EXPO_PUBLIC_USER_API_Firebase2 ,
  
    authDomain: "calculando-f8af8.firebaseapp.com",
  
    projectId: "calculando-f8af8",
  
    storageBucket: "calculando-f8af8.firebasestorage.app",
  
    messagingSenderId: "68303837221",
  
    appId: "1:68303837221:web:fc8411b34c7a17120947cc"
  
  };
  
  
  
  
  // const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  

  export const app = initializeApp(firebaseConfig);;