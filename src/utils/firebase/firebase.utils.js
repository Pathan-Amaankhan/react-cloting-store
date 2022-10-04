import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDYlZoxyXjLySux3aekzJjldB0q9_8fdnw",
    authDomain: "react-cloting-db.firebaseapp.com",
    projectId: "react-cloting-db",
    storageBucket: "react-cloting-db.appspot.com",
    messagingSenderId: "747510969551",
    appId: "1:747510969551:web:027f5265b00c40fbdff3ba"
};

const firebaseApp = initializeApp( firebaseConfig );

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
   prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup( auth, provider );

export const db = getFirestore();

export const createUserDocFromAuth = async ( userAuth, additionalInformation ) => {
    if ( ! userAuth ) return;

    const userDocRef = doc( db, 'users', userAuth.uid );

    const userSnapshot = await getDoc( userDocRef );

    if ( ! userSnapshot.exists() ) {
        const { displayName, email } = userAuth;

        const createdAt = new Date();

        try {
            await setDoc(
                userDocRef,
                {
                    displayName,
                    email,
                    createdAt,
                    ...additionalInformation,
                }
            );
        } catch ( error ) {
            return false;
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async ( email, password ) => {
    if ( ! email || ! password ) return;

    return await createUserWithEmailAndPassword( auth, email, password );
}

export const signInUserWithEmailAndPassword = async ( email, password ) => {
    if ( ! email || ! password ) return;

    return await signInWithEmailAndPassword( auth, email, password );
}