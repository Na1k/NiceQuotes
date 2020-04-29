import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDwvtJjzqs_MSzkTDaFYbe0JL_VuT_GsQY",
    authDomain: "quotes-ebfe2.firebaseapp.com",
    databaseURL: "https://quotes-ebfe2.firebaseio.com",
    projectId: "quotes-ebfe2",
    storageBucket: "quotes-ebfe2.appspot.com",
    messagingSenderId: "642154167173",
    appId: "1:642154167173:web:f5a9f955149c147787a2ec"
};

export default class Firebase {
    static db;

    static init() {
        firebase.initializeApp(firebaseConfig);
        Firebase.db = firebase.firestore();
    }
}  