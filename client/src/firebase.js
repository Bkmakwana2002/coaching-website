import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {

    apiKey: "AIzaSyDydKKwtc4V-DwWivEh1BkxQ58mOJjHCBA",

    authDomain: "coaching-website-c1223.firebaseapp.com",

    projectId: "coaching-website-c1223",

    storageBucket: "coaching-website-c1223.appspot.com",

    messagingSenderId: "307789877438",

    appId: "1:307789877438:web:d721f8efdbcfdb4ca94eef",

    measurementId: "G-X8VEDQPE69"

};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)