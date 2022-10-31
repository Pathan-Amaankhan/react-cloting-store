import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDYlZoxyXjLySux3aekzJjldB0q9_8fdnw",
    authDomain: "react-cloting-db.firebaseapp.com",
    projectId: "react-cloting-db",
    storageBucket: "react-cloting-db.appspot.com",
    messagingSenderId: "747510969551",
    appId: "1:747510969551:web:027f5265b00c40fbdff3ba"
};

const firebaseApp = initializeApp( firebaseConfig );

export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
    const collectionRef = collection( db, collectionKey );

    const batch = writeBatch( db );

    objectsToAdd.forEach( object => {
        const docRef = doc( collectionRef, object.title.toLowerCase() );
        batch.set( docRef, object );
    } );

    await batch.commit();

    console.log('done');
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection( db, 'categories' );
    const q = query( collectionRef );

    const querySnapshot = await getDocs( q );

    const categoryMap = querySnapshot.docs.reduce( ( accumulator, docSnapshot ) => {
        const { title, items } = docSnapshot.data();
        accumulator[title.toLowerCase()] = items;
        return accumulator;
    }, {} );

    return categoryMap;
}

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

export const signUserOut = async () => {
    await signOut( auth );
}

export const onAuthChangeListener = ( callback ) => {
    return onAuthStateChanged( auth, callback );
}