import { createContext, useEffect, useState } from "react";
import app from "../utils/firebase.config";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";

const authContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUserWithEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
    };

    const googleProvider = new GoogleAuthProvider();

    const createUserWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider).finally(() => setLoading(false));
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password).finally(() => setLoading(false));
    };

    const signOutUser = () => {
        setLoading(true);
        return signOut(auth).finally(() => setLoading(false));
    };

    const passwordReset = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        setUser,
        createUserWithEmail,
        createUserWithGoogle,
        signInUser,
        signOutUser,
        passwordReset,
    };

    return (
        <authContext.Provider value={authInfo}>
            {children}
        </authContext.Provider>
    );
};

export { AuthProvider, authContext };
