import { auth, db } from '../firebase/firebaseConfig';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { updateProfile, deleteUser } from 'firebase/auth';
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

// Password validation regex
const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

export const updateUserProfile = async (uid, newDisplayName, mobile, password = '') => {
    if (!auth.currentUser || auth.currentUser.uid !== uid) return;

    // Update Auth displayName
    await updateProfile(auth.currentUser, { displayName: newDisplayName });

    // Conditionally update password
    if (password) {
        if (!isValidPassword(password)) {
            throw new Error('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
        }
        await updatePassword(auth.currentUser, password);
    }

    // Update Firestore: displayName and mobile
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
        displayName: newDisplayName,
        mobile: mobile,
    });
};

// Deletes user's account from Firebase Auth and Firestore.
export const deleteUserAccount = async (uid) => {
    const currentUser = auth.currentUser;
    if (!currentUser || currentUser.uid !== uid) return;

    const email = currentUser.email;
    const password = prompt('Please re-enter your password to confirm account deletion:');
    if (!password) throw new Error('Password is required to reauthenticate.');

    const credential = EmailAuthProvider.credential(email, password);

    try {
        // Reauthenticate the user
        await reauthenticateWithCredential(currentUser, credential);
        // Now delete
        await deleteUser(currentUser);

        // Optionally: delete user data in Firestore
        const userRef = doc(db, 'users', uid);
        await deleteDoc(userRef);
    } catch (error) {
        throw new Error(`Failed to delete user: ${error.message}`);
    }
};


