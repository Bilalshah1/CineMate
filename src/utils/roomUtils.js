import { db } from '../firebase/firebaseConfig';
import { doc, collection, setDoc, getDoc, addDoc, deleteDoc } from 'firebase/firestore';


// Generates a random 8-character uppercase hexadecimal Room ID
export function generateRoomId() {
    return [...Array(8)].map(() => Math.floor(Math.random() * 16).toString(16).toUpperCase()).join('');
}

// Creates a room in Firestore, associating it with the user
export async function createRoom(user) {
    if (!user) throw new Error('User must be logged in');

    let roomId;
    let exists = true;

    // Ensure the room ID is unique
    while (exists) {
        roomId = generateRoomId();
        const docSnap = await getDoc(doc(db, 'rooms', roomId));
        exists = docSnap.exists();
    }

    const roomData = {
        ownerUid: user.uid,
        createdAt: new Date(),
        members: [user.uid],
        videoUrl: '', // default empty
        playback: {
            isPlaying: false,
            currentTime: 0,
            lastUpdated: Date.now(),
            lastUpdatedBy: user.uid,
            playbackRate: 1,
            volume: 50,
            isMuted: false
        }
    };

    await setDoc(doc(db, 'rooms', roomId), roomData);

    // Initial message to 'messages' subcollection
    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    await addDoc(messagesRef, {
        senderId: user.uid,
        message: 'Stay tuned to the vibe—send live messages to your friends.',
        timestamp: new Date()
    });

    return roomId;
}


export const deleteRoomIfCreator = async (roomId, currentUserId) => {
    try {
        const roomRef = doc(db, "rooms", roomId);
        const roomSnap = await getDoc(roomRef);

        if (!roomSnap.exists()) {
            throw new Error("Room not found.");
        }

        const roomData = roomSnap.data();
        if (roomData.ownerUid !== currentUserId) {
            throw new Error("Unauthorized: Only the room creator can delete this room.");
        }

        await deleteDoc(roomRef);
        alert('Room successfully deleted');
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export async function joinRoom(roomId, user) {
    if (!roomId || !/^[0-9A-F]{8}$/i.test(roomId)) {
        throw new Error('Invalid Room ID format. Must be 8-character hexadecimal.');
    }

    if (!user) {
        throw new Error('User must be logged in to join a room');
    }

    const roomRef = doc(db, 'rooms', roomId);
    const roomSnap = await getDoc(roomRef);

    if (!roomSnap.exists()) {
        throw new Error('Room not found. Please check the Room ID.');
    }

    const roomData = roomSnap.data();
    if (!roomData.members.includes(user.uid)) {
        await setDoc(roomRef, {
            ...roomData,
            members: [...roomData.members, user.uid]
        }, { merge: true });
    }

    return roomId;
}