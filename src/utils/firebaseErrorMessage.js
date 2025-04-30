// Not Working

const errorMessages = {
    'auth/user-not-found': 'No user found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-email': 'Invalid email address.',
    'auth/email-already-in-use': 'Email is already registered.',
    'auth/weak-password': 'Password is too weak.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/too-many-requests': 'Too many attempts. Try again later.',
    'auth/network-request-failed': 'Network error. Check your connection.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed.',
    'auth/cancelled-popup-request': 'Cancelled previous popup request.',
};

function getFirebaseAuthErrorMessage(errorCode) {
    return errorMessages[errorCode] || 'Authentication error. Please try again.';
}

export { getFirebaseAuthErrorMessage };

