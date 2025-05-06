// 1. Core libraries
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

// 4. Authentication and Firebase context
import { useAuth } from '../auth/AuthContext';
import { db } from '../firebase/firebaseConfig';

// 3. Utilities and helper functions
import { deleteRoomIfCreator } from '../utils/roomUtils';

// 6. Local components
import VideoPlayer from './VideoPlayer';

// 2b. Firebase-specific functions (if separated for clarity)
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

// 5. Static resources (SVGs)
import go_svg from '../assets/SVGs/room_SVGs/go_svg.svg';
import deleteRoom_svg from '../assets/SVGs/room_SVGs/deleteRoom_svg.svg';
import peopleRem_svg from '../assets/SVGs/room_SVGs/peopleRem_svg.svg';
import link_svg from '../assets/SVGs/room_SVGs/link_svg.svg';
import removePerson_svg from '../assets/SVGs/room_SVGs/removePerson_svg.svg';
import copy_svg from '../assets/SVGs/hero_SVGs/copy_svg.svg';


/*
Some Video-links
1. Rick Astley - Never Gonna Give You Up (Official Music Video)
https://youtu.be/dQw4w9WgXcQ
2. Carla Chamoun - Khedni Maak - Cover
https://youtu.be/5GgfjmqKbM8 
3. Abeer Nehme - Baadni Bhebak
https://youtu.be/a9y85vsWhu4
4. Sami Yusuf - Nasimi (Expo Version) [Live] 
https://youtu.be/BdoGhpoNu84
5. Nancy Ajram Feat K'naan - Waving Flag (Official Music Video)
https://youtu.be/fSo2Ll6YTwc
*/

function Room() {
  const [videoUrl, setVideoUrl] = useState('https://youtu.be/5GgfjmqKbM8');
  const [isWhosHereModal, setWhosHereModal] = useState(false);
  

  const { user } = useAuth();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [memberUsers, setMemberUsers] = useState([]);
  
  useEffect(() => {
    if (!user) return;

    const roomRef = doc(db, 'rooms', roomId);

    const unsubscribe = onSnapshot(roomRef, async (roomSnap) => {
      if (roomSnap.exists()) {
        const roomData = roomSnap.data();

        // Update local room state
        setRoom(roomData);

        // Immediately redirect if current user was removed
        if (user && !roomData.members.includes(user.uid)) {
          alert("You've been removed from the room.");
          navigate('/home');
          return;
        }

        if (roomData.members && roomData.members.length > 0) {
          const userDocs = await Promise.all(
            roomData.members.map(uid => getDoc(doc(db, 'users', uid)))
          );

          const usersData = userDocs
            .filter(doc => doc.exists())
            .map(doc => ({ uid: doc.id, ...doc.data() }));

          setMemberUsers(usersData);
        } else {
          setMemberUsers([]);
        }
      } else {
        navigate('/home');
      }
    });

    return () => unsubscribe();
  }, [roomId, navigate, user]);
  
  const handleRemoveUser = async (userIdToRemove) => {
    if (!room || user?.uid !== room.ownerUid) return;
  
    const updatedMembers = room.members.filter(uid => uid !== userIdToRemove);
    const roomRef = doc(db, 'rooms', roomId);
  
    try {
      await setDoc(roomRef, { members: updatedMembers }, { merge: true });
      setRoom(prev => ({ ...prev, members: updatedMembers }));
  
      // Fetch updated user data
      const userDocs = await Promise.all(
        updatedMembers.map(uid => getDoc(doc(db, 'users', uid)))
      );
      const usersData = userDocs
        .filter(doc => doc.exists())
        .map(doc => ({ uid: doc.id, ...doc.data() }));
      setMemberUsers(usersData);
    } catch (error) {
      console.error("Error removing user:", error);
    }
  };
  

  const handleDeleteRoom = async () => {
    if (!user || !room) return;
  
    const result = await deleteRoomIfCreator(roomId, user.uid);
    if (result.success) {
      navigate("/home");
    } else {
      alert(`Error: ${result.message}`);
    }
  };

  return (
    <div className="p-2 md:px-4">
      {/* Top Controls Section */}
      <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
        {/* Video URL Input */}
        <div className='w-full md:w-1/2 flex flex-col'>
          <span className='m-1 ml-2 md:ml-5 text-sm md:text-base'>
            <img src={link_svg} alt="" className='w-4 h-4 inline mr-1'/> 
            Paste the link below to begin synchronized playback.
          </span>
          <div className='p-1 md:p-2 flex items-center justify-between border border-gray-700 rounded-xl bg-gray-100 transition-colors duration-300'>
            <input
              type='text'
              value={videoUrl}
              placeholder='e.g., https://youtu.be/dQw4w9WgXcQ'
              className='flex-1 text-center text-gray-800 text-sm md:text-base font-medium bg-transparent outline-none placeholder-gray-500 px-2'
              title='Enter a valid YouTube video URL (e.g., https://youtu.be/dQw4w9WgXcQ)'
              onChange={(e) => setVideoUrl(e.target.value)}
              onInput={(e) => e.target.value = e.target.value.trim()}
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className='flex justify-between w-full md:w-auto gap-2'>
          {/* Room ID Copy Button */}
          <div className='flex items-center justify-between border-2 border-gray-700 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300 px-3 py-1.5 min-w-[120px] group'>
            <span className='flex-1 text-center text-gray-800 font-medium text-sm truncate'>{roomId}</span>
            <div className='w-5 h-5 ml-2 relative'>
              <div className='absolute left-[-2px] top-0 h-full border-l border-gray-700'></div>
              <img 
                src={copy_svg} 
                className='w-full h-full hover:cursor-pointer hover:scale-110 transition-all duration-200 group-hover:opacity-80'
                alt="Copy Room ID"
                onClick={() => navigator.clipboard.writeText(roomId)}
              />
            </div>
          </div>

          {/* Who's Here Button */}
          <button 
            className="bg-blue-900 group-hover:bg-red-800 flex items-center border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group min-w-[120px] h-[40px]"
            onClick={() => setWhosHereModal(true)}
          >
            <img className="w-5 h-5 ml-2" src={peopleRem_svg} alt="Who's Here" />
            <p className="text-sm flex-1  text-white px-3 py-1.5 rounded-r-md">
              Who's Here
            </p>
          </button>

          {/* Delete Room Button */}
          {room && user?.uid === room.ownerUid && (
          <button 
            className="bg-red-800 group-hover:bg-blue-900 flex items-center border-2 border-black shadow-md hover:shadow-xl hover:scale-102 rounded-lg transition-all duration-300 active:scale-108 group min-w-[120px] h-[40px]"
            onClick={handleDeleteRoom}
          >
            <p className="text-sm flex-1 text-white px-3 py-1.5 rounded-l-md">
              Delete Room
            </p>
            <img className="w-5 h-5 mr-2" src={deleteRoom_svg} alt="Delete Room" />
          </button>
          )}
        </div>
      </div>

      {/* Video and Chat Section */}
      <div className='flex flex-col lg:flex-row justify-between gap-4'>
        <VideoPlayer videoUrl={videoUrl}/>
        <div className='mt-24 lg:mt-2 h-60 md:h-80 md:w-[58%] w-full lg:w-1/3 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-lg shadow-md p-3 border border-yellow-600'>
          <h3 className='text-lg font-semibold text-gray-800 mb-2'>Chat</h3>
          <div className='h-full bg-white/50 rounded p-2 text-center text-gray-600'>
            Chat functionality coming soon
          </div>
        </div>
      </div>

      {/* Who's Here Modal */}
      <AnimatePresence>
        {isWhosHereModal && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center"
            onClick={() => setWhosHereModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-blue-700/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            ></motion.div>
            <motion.div 
              className="relative z-50 flex flex-col items-center w-80 p-6 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-all duration-300"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-labelledby="whos-here-heading"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <span id="whos-here-heading" className='text-xl font-semibold text-gray-900 mb-4'>Who's Here</span>
              <div className="w-full space-y-2">
                {memberUsers.length === 0 ? (
                  <p className="text-center text-gray-700">No members found.</p>
                ) : (
                  memberUsers.map(member => {
                    const isCreator = room?.ownerUid === member.uid;
                    const isCurrentUser = user?.uid === member.uid;
                    const canRemove = user?.uid === room?.ownerUid && !isCreator;

                    return (
                      <div key={member.uid} className="flex items-center justify-between bg-white/80 p-2 rounded-lg">
                        <span className="text-gray-800">
                          {member.displayName || 'Unnamed'} {isCurrentUser ? '(me)' : ''}
                        </span>
                        <button 
                          onClick={() => handleRemoveUser(member.uid)}
                          className={`text-red-600 hover:text-red-800 transition-colors ${!canRemove ? 'opacity-50 cursor-not-allowed' : ''}`}
                          aria-label={`Remove ${member.displayName}`}
                          disabled={!canRemove}
                        >
                          <img src={removePerson_svg} alt="Remove" className="w-5 h-5 hover:cursor-pointer"/>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Room

// TODO
// The 'goto' button mis-behaving therefore commented-out.
// Un-intuitive URL-change functionality
// Even upon successful updation of videoUrl, new video is not loading.
// Room retained in Firebase storage permanetly. (Should be solved)