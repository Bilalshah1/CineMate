import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';

export async function sendMessage(roomId, userId, userName, message) {
    if (!roomId || !userId || !message.trim()) {
        throw new Error('Invalid message parameters');
    }

    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    await addDoc(messagesRef, {
        senderId: userId,
        senderName: userName,
        message: message.trim(),
        timestamp: serverTimestamp()
    });
}