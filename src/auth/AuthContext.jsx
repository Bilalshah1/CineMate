import { createContext, useContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/firebaseConfig';

// Create context and custom hook
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Handle user state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          if (userDoc.exists()) {
            setUser(userDoc.data());
          } else {
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: firebaseUser.displayName,
            });
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Sign in with email and password
  const signIn = async (email, password, persistenceType = 'session') => {
    const persistence =
      persistenceType === 'local' ? browserLocalPersistence : browserSessionPersistence;
  
    await setPersistence(auth, persistence);
    return signInWithEmailAndPassword(auth, email, password);
  };  

  // Sign up with email, password, and username
  const signUp = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;

    // Update display name in Firebase Auth
    await updateProfile(newUser, { displayName: username });

    // Save user info to Firestore
    await setDoc(doc(db, 'users', newUser.uid), {
      uid: newUser.uid,
      email: newUser.email,
      displayName: username,
    });
  };

  // Sign in with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      });
    }
  };

  // Logout
  const logout = () => signOut(auth);

  // Provide context values
  return (
    <AuthContext.Provider
      value={{
        user,
        logout,
        signIn,
        signUp,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
