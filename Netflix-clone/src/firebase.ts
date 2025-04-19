import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {
    addDoc,
    collection,
    getFirestore
} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyBP5xoVyI5TSfGMviYGM7BI1XK63TilayM",
    authDomain: "netflix-clone-76859.firebaseapp.com",
    projectId: "netflix-clone-76859",
    storageBucket: "netflix-clone-76859.firebasestorage.app",
    messagingSenderId: "624358654674",
    appId: "1:624358654674:web:abcfc1d814c3916cb1a30b"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name: string, email: string, password: string) => {

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error) {
            const firebaseError = error as { code: string };
            toast.error(firebaseError.code.split('/')[1].split('-').join(' '));
        } else {
            toast.error("An unknown error occurred");
        }
    }
    
}

const login = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error: unknown) {
        if (typeof error === 'object' && error !== null && 'code' in error) {
            const firebaseError = error as { code: string };
            toast.error(firebaseError.code.split('/')[1].split('-').join(' '));
        } else {
            toast.error("An unknown error occurred");
        }
    }
    
}

const logout = () => {
    signOut(auth);
}

export{
    auth,
    db,
    login,
    signup,
    logout
}

