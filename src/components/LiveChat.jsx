// 1. Core libraries
import React, { useState, useEffect, useRef} from 'react'

// 2. Third-party libraries
import { motion, AnimatePresence } from "framer-motion";

// 2b. Firebase-specific functions (if separated for clarity)
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

// 3. Utilities and helper functions
import {sendMessage} from '../utils/chatUtils';

// 4. Authentication and Firebase context
import { useAuth } from '../auth/AuthContext';
import { db } from '../firebase/firebaseConfig';

// 5. Static resources (SVGs)
import send_svg from '../assets/SVGs/liveChat_SVGs/send_svg.svg'; 
import cool_Emoji_svg from '../assets/SVGs/liveChat_SVGs/cool_Emoji_svg.svg';
import crying_Emoji_svg from '../assets/SVGs/liveChat_SVGs/crying_Emoji_svg.svg';
import devil_Emoji_svg from '../assets/SVGs/liveChat_SVGs/devil_Emoji_svg.svg';
import famous_Emoji_svg from '../assets/SVGs/liveChat_SVGs/famous_Emoji_svg.svg';
import puking_Emoji_svg from '../assets/SVGs/liveChat_SVGs/puking_Emoji_svg.svg';
import powerOff_svg from '../assets/SVGs/liveChat_SVGs/powerOff_svg.svg';
import powerOn_svg from '../assets/SVGs/liveChat_SVGs/powerOn_svg.svg';


const messageStyles = {
  sent: {
    alignSelf: 'flex-end',
    backgroundImage: 'linear-gradient(to left, rgba(96,165,250,0.7), rgba(168,85,247,0.5), rgba(252,165,165,0.5))',
    color: '#374151',
    marginLeft: '20%'
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#cbccc6',
    color: '#374151',
    marginRight: '20%'
  },
  messageContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    padding: '6px 12px',
    borderRadius: '12px',
    marginBottom: '6px',
    maxWidth: '80%',
    wordBreak: 'break-word'
  },
  username: {
    fontSize: '0.75rem',
    fontWeight: '700'
  }
};


// Does contain Reactions button and Logic as well. 
function LiveChat({ roomId }) {

  const { user } = useAuth();

  const [messagesArray, setMessagesArray] = useState([]);
  // Replace the current useEffect for loading messages with this:
  useEffect(() => {
    if (!roomId) return;

    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot.forEach(doc => {
        messages.push({
          id: doc.id,
          ...doc.data()
        });
      });
      setMessagesArray(messages);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, [roomId]);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messagesArray]);

  const [Reactions, setReactions] = useState(true);
  const toggleReactions = () => {
    setReactions(prev => !prev);
  };

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 200); // Duration of animation
  };

  const [burstEmoji, setBurstEmoji] = useState(null);
  const triggerBurst = (emoji) => {
    setBurstEmoji(null);
    requestAnimationFrame(() => {
      setBurstEmoji(emoji);
      setTimeout(() => setBurstEmoji(null), 3000);
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = event.target.elements[0].value;
  
    try {
      event.target.reset();
      await sendMessage(roomId, user.uid, message); 
      // event.target.reset();
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };
  

  return (
    <div className='lg:mr-12 mt-24 lg:mt-2 h-80 md:h-85 md:w-[58%] w-full lg:w-1/3 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300  rounded-lg shadow-md p-3 border border-yellow-600'>
      <h3 className='text-xl font-semibold text-white mb-2'>Live Chat</h3>
      <div className='w-full h-full flex flex-row gap-5'>
        <div>
        {Reactions && (
          <div>
            <div className="relative group mb-3">
              <span className="absolute inset-0 w-8 h-8 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-300 pointer-events-none"></span>
              <button onClick={() => triggerBurst(cool_Emoji_svg)} className="focus:outline-none">
                <img
                  src={cool_Emoji_svg}
                  alt="Cool emoji"
                  className="w-7 h-7 hover:scale-110 transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                />
              </button>
            </div>
            <div className="relative group mb-3">
              <span className="absolute inset-0 w-8 h-8 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-300 pointer-events-none"></span>
              <button onClick={() => triggerBurst(crying_Emoji_svg)} className="focus:outline-none">
                <img
                  src={crying_Emoji_svg}
                  alt="Cool emoji"
                  className="w-7 h-7 hover:scale-110 transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                />
              </button>
            </div>
            <div className="relative group mb-3">
              <span className="absolute inset-0 w-8 h-8 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-300 pointer-events-none"></span>
              <button onClick={() => triggerBurst(devil_Emoji_svg)} className="focus:outline-none">
                <img
                  src={devil_Emoji_svg}
                  alt="Cool emoji"
                  className="w-7 h-7 hover:scale-110 transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                />
              </button>
            </div>
            <div className="relative group mb-3">
              <span className="absolute inset-0 w-8 h-8 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-300 pointer-events-none"></span>
              <button onClick={() => triggerBurst(famous_Emoji_svg)} className="focus:outline-none">
                <img
                  src={famous_Emoji_svg}
                  alt="Cool emoji"
                  className="w-7 h-7 hover:scale-110 transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                />
              </button>
            </div>
            <div className="relative group mb-3">
              <span className="absolute inset-0 w-8 h-8 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-300 pointer-events-none"></span>
              <button onClick={() => triggerBurst(puking_Emoji_svg)} className="focus:outline-none">
                <img
                  src={puking_Emoji_svg}
                  alt="Cool emoji"
                  className="w-7 h-7 hover:scale-110 transition-all duration-300 rounded-full shadow-md hover:shadow-lg"
                />
              </button>
            </div>
          </div>
        )}
          <div 
            className="relative group mb-4 inline-block"
            onClick={toggleReactions}
          >
            <span className="absolute inset-0 w-8 h-8 rounded-full bg-white opacity-0 group-active:opacity-30 transition-opacity duration-300 pointer-events-none"></span>
            <img
              src={Reactions ? powerOff_svg : powerOn_svg}
              alt="Toggle Reactions"
              className="mb-2 w-7 h-7 hover:scale-125 transition-all duration-300 rounded-full shadow-md hover:shadow-lg cursor-pointer"
            />
            {/* <div className="absolute top-full left-1/2 transform -translate-x-1/4 mb-2 px-2 py-1 
                  bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                  transition-opacity duration-300 delay-150 whitespace-nowrap z-10 shadow-lg pointer-events:none">
              Toggle Reactions On or Off.
            </div> */}
          </div>
        </div>

        <div className="bg-white w-[85%] h-[85%] rounded-lg flex flex-col justify-between p-4">
          <div className="flex-1 overflow-y-auto">
            {messagesArray.map((message) => {
              const isSent = message.senderId === user?.uid;
              const username = isSent ? '(Me)' : message.senderId; // Replace with actual displayName if available
              
              return (
                <div 
                  key={message.id} 
                  style={{
                    ...messageStyles.messageContainer,
                    ...(isSent ? messageStyles.sent : messageStyles.received)
                  }}
                >
                  <span style={messageStyles.username}>{username}</span>
                  <span>{message.message}</span>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-4">
            <div className="relative group w-full">
              <div className="p-[2px] rounded-md bg-[length:200%_200%] bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 transition-all duration-500 bg-left group-focus-within:bg-right">
                <div className="rounded-md bg-white">
                  <input 
                    type="text" 
                    required
                    maxLength="100"
                    className="w-full h-8 px-3 rounded-md bg-white text-gray-800 outline-none"
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick} type="submit">
              <img src={send_svg} alt="Send" className={`w-8 h-8 hover:scale-115 transition-all duration-500 ${
                isClicked ? 'rotate-360' : 'rotate-0'
                }`}
              />
            </button>
          </form>
        </div>
      </div>
      <AnimatePresence>
        {burstEmoji && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(25)].map((_, i) => (
              <motion.div
              key={`${burstEmoji}-${i}-${Date.now()}`}
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: window.innerHeight + 100,
                  opacity: 1,
                  scale: 0.8 + Math.random() * 0.7
                }}
                animate={{
                  y: -200,
                  x: Math.random() * window.innerWidth,
                  rotate: Math.random() * 360,
                  scale: 1 + Math.random()
                }}
                exit={{
                  opacity: 0,
                  scale: 0.3
                }}
                transition={{
                  duration: 2.5 + Math.random(),
                  ease: "easeOut",
                  repeat: 0
                }}
                className="absolute"
                style={{
                  width: `${40 + Math.random() * 40}px`,
                  height: `${40 + Math.random() * 40}px`
                }}
              >
                <img 
                  src={burstEmoji} 
                  className="w-full h-full" 
                  alt="burst emoji" 
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LiveChat