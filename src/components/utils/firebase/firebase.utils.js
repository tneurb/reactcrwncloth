import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAj0gBXBXKSShc73LAqT7ZwRlodv9JBZTE",
    authDomain: "crwn-clothing-db-6a37e.firebaseapp.com",
    projectId: "crwn-clothing-db-6a37e",
    storageBucket: "crwn-clothing-db-6a37e.appspot.com",
    messagingSenderId: "123536252042",
    appId: "1:123536252042:web:81cf54a5a93f3f7060e173"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
  

  export const db = getFirestore()
  export const createUserDocumentFromAuth = async (userAuth,additionInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSanpShot = await getDoc(userDocRef);


    if(!userSanpShot.exists()){
        const {displayName, email } =userAuth;
        const createdAt = new Date()
        try {
            await setDoc(userDocRef,{
                displayName,
                email,
                createdAt,
                ...additionInformation
            })
        } catch (error) {
            console.log('error crating the user',error.massage)
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return ;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return ;
    return await signInWithEmailAndPassword(auth, email, password);
}