// 1. Core libraries
import React, { useEffect, useState, useRef } from 'react';

// 2. Third-party libraries
import { useParams } from 'react-router-dom';

// 4. Authentication and Firebase context
import { db } from '../firebase/firebaseConfig'; 
import { useAuth } from '../auth/AuthContext';

// 2b. Firebase-specific functions (if separated for clarity)
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';

// 5. Static resources (SVGs for video player controls)
import play_svg from '../assets/SVGs/videoplayer_SVGs/play_svg.svg';
import pause_svg from '../assets/SVGs/videoplayer_SVGs/pause_svg.svg';
import seek10_svg from '../assets/SVGs/videoplayer_SVGs/seek10_svg.svg';
import seek10back_svg from '../assets/SVGs/videoplayer_SVGs/seek10back_svg.svg';
import fullScreen_svg from '../assets/SVGs/videoplayer_SVGs/fullScreen_svg.svg';
import mute_svg from '../assets/SVGs/videoplayer_SVGs/mute_svg.svg';
import pbSpeed_svg from '../assets/SVGs/videoplayer_SVGs/pbSpeed_svg.svg';
import volume_svg from '../assets/SVGs/videoplayer_SVGs/volume_svg.svg';
import videoQuality_svg from '../assets/SVGs/videoplayer_SVGs/videoQuality_svg.svg';


// Function to format time
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const paddedMins = mins < 10 && hrs > 0 ? '0' + mins : mins;
  const paddedSecs = secs < 10 ? '0' + secs : secs;

  return hrs > 0
    ? `${hrs}:${paddedMins}:${paddedSecs}`
    : `${mins}:${paddedSecs}`;
};

// Function to extract video ID from YouTube URL
const getVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

function VideoPlayer({ videoUrl }) {
  const videoId = getVideoId(videoUrl);
  const { user } = useAuth();
  // console.log('[DEBUG]',user);
  const { roomId } = useParams();


  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showQualityMenu, setshowQualityMenu] = useState(false);
  const [Quality, setQuality] = useState('medium');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const speedMenuRef = useRef(null);
  const QualityMenuRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const playerContainerRef = useRef(null);
  const unsubscribeRef = useRef(null);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.5, 1.75, 2];
  const qualityOptions = [
    { value: 'hd1080', label: '1080p' },
    { value: 'hd720', label: '720p' },
    { value: 'large', label: '480p' },
    { value: 'medium', label: '360p' },
    { value: 'small', label: '240p' },
    { value: 'tiny', label: '144p' },
    { value: 'auto', label: 'Auto' }
  ];


  // Load YouTube IFrame API script dynamically
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        if (videoId) initializePlayer();
      };
    } else if (videoId) {
      initializePlayer();
    }

    return () => {
      if (player) {
        player.destroy();
      }
      window.onYouTubeIframeAPIReady = null;
      clearTimeout(controlsTimeoutRef.current);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [videoId]);

  // Handle fullscreen change events
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Handle clicks outside speed menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (speedMenuRef.current && !speedMenuRef.current.contains(event.target)) {
        setShowSpeedMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle clicks outside quality menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (QualityMenuRef.current && !QualityMenuRef.current.contains(event.target)) {
        setshowQualityMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  // Auto-hide controls in fullscreen mode
  useEffect(() => {
    if (!isFullscreen) {
      setControlsVisible(true);
      return;
    }

    const resetControlsTimeout = () => {
      document.addEventListener('touchstart', (e) => {
        console.log('Touch at:', e.target);
      }, { capture: true });

      clearTimeout(controlsTimeoutRef.current);
      setControlsVisible(true);
      controlsTimeoutRef.current = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);
    };

    resetControlsTimeout();

    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', resetControlsTimeout);
      container.addEventListener('touchstart', resetControlsTimeout);

      return () => {
        container.removeEventListener('mousemove', resetControlsTimeout);
        container.removeEventListener('touchstart', resetControlsTimeout);
      };

    }
  }, [isFullscreen]);

  // Initialize the YouTube player
  const initializePlayer = () => {

    const playerHeight = '100%';
    const playerWidth = '100%';

    const newPlayer = new window.YT.Player('player', {
      height: playerHeight,
      width: playerWidth,
      videoId: videoId,
      playerVars: {
        controls: 0,
        disablekb: 0,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
        origin: window.location.origin, // Added this to match local origin
      },
      events: {
        onReady: (event) => {
          setPlayer(event.target);
          setDuration(event.target.getDuration());
          event.target.setPlaybackRate(1);
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            setIsPlaying(true);
          } else if (event.data === window.YT.PlayerState.PAUSED ||
            event.data === window.YT.PlayerState.ENDED) {
            setIsPlaying(false);
          }
        },
      },
    });
    // setPlayer(newPlayer);
  };

  // Update current time for seek bar
  useEffect(() => {
    let interval;
    if (player && typeof player.getCurrentTime === 'function') {
      interval = setInterval(() => {
        try {
          const time = player.getCurrentTime();
          setCurrentTime(time);
        } catch (e) {
          console.error('Error getting current time:', e);
        }
      }, 100);
    }
    return () => clearInterval(interval);
  }, [player]);

  const handleFullscreenChange = () => {
    setIsFullscreen(!!document.fullscreenElement);
  };


  // Listener to the room doc using onSnapshot to reflect updates from Firestore
  useEffect(() => {
    if (!roomId) return;
  
    unsubscribeRef.current = onSnapshot(doc(db, 'rooms', roomId), (docSnap) => {
      if (!docSnap.exists()) return;
  
      const playback = docSnap.data().playback;
      if (!playback || !player) return;
  
      // Avoid feedback loops but replace this with user id check and ignoring self done things 
      if (Date.now() - playback.lastUpdated < 5) return;
  
      setPlaybackRate(playback.playbackRate);
      player.setPlaybackRate(playback.playbackRate);
  
      if (Math.abs(playback.currentTime - player.getCurrentTime()) > 1) {
        player.seekTo(playback.currentTime);
      }
  
      if (playback.isPlaying && !isPlaying) {
        player.playVideo();
      } else if (!playback.isPlaying && isPlaying) {
        player.pauseVideo();
      }
  
      player.setVolume(playback.volume);
      if (playback.isMuted) player.mute();
      else player.unMute();
    });
  
    return () => {
      if (unsubscribeRef.current) unsubscribeRef.current();
    };
  }, [roomId, player]);
  
  // lastUpdated timestamp to avoid sync feedback loops.
  const updateRoomPlayback = async (data) => {
    if (!roomId) return;
    await updateDoc(doc(db, 'rooms', roomId), {
      playback: {
        ...data,
        lastUpdated: Date.now(),
        lastUpdatedBy: user.uid,
      },
    });
  };
  
  // Custom control handlers
  const togglePlayPause = async () => {
    if (!player) return;
  
    const isNowPlaying = !isPlaying;
    isNowPlaying ? player.playVideo() : player.pauseVideo();
    setIsPlaying(isNowPlaying);
    setCurrentTime(player.getCurrentTime());
  
    try {
      await updateRoomPlayback({
        isPlaying: isNowPlaying,
        currentTime: player.getCurrentTime(),
        playbackRate,
        volume: player.getVolume(),
        isMuted: player.isMuted()
      });
    } catch (error) {
      console.error('Sync error:', error);
    }
  };
  

  const handleSeek = async (seconds) => {
    if (!player || typeof player.getCurrentTime !== 'function') return;
    
    const boundedTime = Math.max(0, Math.min(seconds, duration));
    try {
      player.seekTo(boundedTime, true);
      setCurrentTime(boundedTime);
  
      await updateRoomPlayback({
        isPlaying,
        currentTime: boundedTime,
        playbackRate,
        volume: player.getVolume(),
        isMuted: player.isMuted()
      });
    } catch (error) {
      console.error('Seek error:', error);
    }
  };


  const handleSeekBy = async (seconds) => {
    if (!player || typeof player.getCurrentTime !== 'function') return;
  
    try {
      const newTime = Math.max(0, Math.min(player.getCurrentTime() + seconds, duration));
      player.seekTo(newTime, true);
      setCurrentTime(newTime);
  
      await updateRoomPlayback({
        isPlaying,
        currentTime: newTime,
        playbackRate,
        volume: player.getVolume(),
        isMuted: player.isMuted()
      });
    } catch (error) {
      console.error('Seek error:', error);
    }
  };
  

  const handleVolumeChange = async (event) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
    player.setVolume(newVolume);
  
    await updateRoomPlayback({
      isPlaying,
      currentTime: player.getCurrentTime(),
      playbackRate,
      volume: newVolume,
      isMuted: player.isMuted()
    });
  };
  

  const handleSeekBarHover = (e) => {
    const seekBar = e.currentTarget;
    const rect = seekBar.getBoundingClientRect();
    const position = (e.clientX - rect.left) / rect.width;
    const time = position * duration;
    setHoverTime(time);
  };

  const toggleFullScreen = () => {
    if (!playerContainerRef.current) return;

    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };


  const toggleMute = async () => {
    if (!player) return;
    const shouldMute = !isMuted;
    
    shouldMute ? player.mute() : player.unMute();
    setIsMuted(shouldMute);
    
    if (!shouldMute) {
      player.setVolume(previousVolume);
    } else {
      setPreviousVolume(player.getVolume());
    }
  
    try {
      await updateRoomPlayback({
        isPlaying,
        currentTime: player.getCurrentTime(),
        playbackRate,
        volume: player.getVolume(),
        isMuted: shouldMute
      });
    } catch (error) {
      console.error('Sync error:', error);
    }
  };
  

  const handleSpeedChange = async (speed) => {
    if (player) {
      player.setPlaybackRate(speed);
      setPlaybackRate(speed);

      try {
        await updateRoomPlayback({
          isPlaying,
          currentTime: player.getCurrentTime(),
          playbackRate: speed,
          volume: player.getVolume(),
          isMuted: player.isMuted()
        });
      } catch (error) {
        console.error('Sync error:', error);
      }
    }
    setShowSpeedMenu(false);
  };
  

  const handleQualityChange = (quality) => {
    if (player) {
      player.setPlaybackQuality(quality);
      setQuality(quality);
    }
    setshowQualityMenu(false);
  };

  return (
    <div
      className="p-2 md:p-5 max-w-[100%] md:max-w-[60%]"
      ref={playerContainerRef}
      style={{ height: '300px', position: 'relative' }}
    >
      {videoId ? (
        <>
          <div id="player"></div>
          <div
            className={`flex flex-wrap gap-1 md:gap-1.5 items-center justify-between p-1 mt-2 bg-white rounded transition-opacity duration-300 ${isFullscreen ? 'absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[100%] md:w-[80%]' : ''}`}
            style={{
              opacity: isFullscreen ? (controlsVisible ? 1 : 0) : 1,
              pointerEvents: isFullscreen ? (controlsVisible ? 'auto' : 'none') : 'auto'
            }}
          >
            {/* Combined Play/Pause Button */}
            <button
              className="text-white hover:cursor-pointer hover:scale-105 transition-transform active:scale-95"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <img
                src={isPlaying ? pause_svg : play_svg}
                alt={isPlaying ? "Play" : "Pause"}
                className="w-6 h-6 md:w-5 md:h-5"
              />
            </button>

            {/* Seek Buttons */}
            <button
              className="text-white hover:cursor-pointer hover:scale-105 transition-transform active:scale-95"
              onClick={() => handleSeekBy(-10)}
              aria-label="Seek back 10 seconds"
            >
              <img src={seek10back_svg} alt="Seek Back 10s" className="w-7 h-7 md:w-6 md:h-6" />
            </button>

            <button
              className="text-white hover:cursor-pointer hover:scale-105 transition-transform active:scale-95"
              onClick={() => handleSeekBy(10)}
              aria-label="Seek forward 10 seconds"
            >
              <img src={seek10_svg} alt="Seek Forward 10s" className="w-7 h-7 md:w-6 md:h-6" />
            </button>

            {/* Seek bar and time display */}
            <div className={`relative w-full order-last md:order-none ${isFullscreen ? 'md:w-[58%]' : 'md:w-70'}`}>
              <div className="flex justify-between text-xs text-gray-800 -mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div
                className="relative h-9"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleSeekBarHover}
              >
                <input
                  type="range"
                  min="0"
                  max={duration || 1}
                  value={currentTime}
                  onChange={(e) => handleSeek(parseFloat(e.target.value))}
                  className="appearance-none w-full h-1.5 md:h-1.5 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-1.5 [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-blue-950 md:[&::-webkit-slider-thumb]:h-1.5 md:[&::-webkit-slider-thumb]:w-1.5 md:[&::-webkit-slider-thumb]:rounded-none"
                />
                <div
                  className="absolute bg-blue-600 rounded-lg pointer-events-none"
                  style={{
                    width: duration > 0 ? `${(currentTime / duration) * 100}%` : '0%',
                  }}
                ></div>
                {isHovering && (
                  <div
                    className="absolute -top-7 bg-gradient-to-r from-red-700 to-blue-950 text-white text-sm rounded px-2 py-1"
                    style={{
                      left: duration > 0 ? `${(hoverTime / duration) * 100}%` : '0%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {formatTime(hoverTime)}
                  </div>
                )}
              </div>
            </div>

            {/* Volume Controls */}
            <div className="flex items-center gap-1 md:gap-2">
              <button
                onClick={toggleMute}
                className="m-1 md:m-2 hover:cursor-pointer hover:scale-105 transition-transform active:scale-95"
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                <img src={isMuted ? mute_svg : volume_svg} alt={isMuted ? "Unmute" : "Mute"} className="w-6 h-6 md:w-5 md:h-5"/>
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={
                  isMuted
                    ? previousVolume
                    : typeof player?.getVolume === "function"
                      ? player.getVolume()
                      : 50
                }
                onChange={handleVolumeChange}
                disabled={isMuted}
                className={`w-16 md:w-24 appearance-none h-1.5 md:h-1.5 bg-gradient-to-l from-blue-400 via-purple-500 to-red-300 cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-1.5 [&::-webkit-slider-thumb]:w-1.5 [&::-webkit-slider-thumb]:rounded-none [&::-webkit-slider-thumb]:bg-blue-950 md:[&::-webkit-slider-thumb]:h-1.5 md:[&::-webkit-slider-thumb]:w-1.5 md:[&::-webkit-slider-thumb]:rounded-none ${isMuted ? 'opacity-50' : ''}`}
              />
            </div>

            {/* Playback Speed Control */}
            <div className="relative" ref={speedMenuRef}>
              <button
                className="text-black rounded-md hover:cursor-pointer hover:scale-105 transition-transform active:scale-95 flex items-center"
                onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                aria-label="Playback speed"
              >
                <span className='text-sm md:text-base font-mono'>{playbackRate}x</span>
                <img src={pbSpeed_svg} alt="Speed" className={`w-5 h-5 md:w-4 md:h-4 transition-transform ${showSpeedMenu ? 'rotate-180' : ''}`}
                />
              </button>
              {showSpeedMenu && (
                <div className="absolute bottom-full left-0 mb-1 w-24 bg-gradient-to-r from-red-700 to-blue-950 rounded-md shadow-lg z-10">
                  {speedOptions.map((speed) => (
                    <button
                      key={speed}
                      className={`w-full text-left px-2 py-1 text-sm text-white hover:bg-red-900 ${playbackRate === speed ? 'bg-blue-950' : ''}`}
                      onClick={() => handleSpeedChange(speed)}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quality Control */}
            <div className="relative" ref={QualityMenuRef}>
              <button
                className="text-black rounded-md hover:cursor-pointer hover:scale-105 transition-transform active:scale-95 flex items-center"
                onClick={() => setshowQualityMenu(!showQualityMenu)}
                aria-label="Playback quality"
              >
                <img src={videoQuality_svg} alt="Quality" className={`w-5 h-5 md:w-4 md:h-4 transition-transform ${showQualityMenu ? 'rotate-180' : ''}`}
                />
              </button>
              {showQualityMenu && (
                <div className="absolute bottom-full left-0 mb-1 w-24 bg-gradient-to-r from-red-700 to-blue-950 rounded-md shadow-lg z-10">
                  {qualityOptions.map((quality) => (
                    <button
                      key={quality}
                      className={`w-full text-left px-2 py-1 text-sm text-white hover:bg-red-900 ${Quality === quality.value ? 'bg-blue-950' : ''}`}
                      onClick={() => handleQualityChange(quality.value)}
                    >
                      {quality.label}
                    </button>
                  ))}
                </div>
              )}
            </div>


            {/* Fullscreen Button */}
            <button
              className="text-white hover:cursor-pointer hover:scale-105 transition-transform active:scale-95"
              onClick={toggleFullScreen}
              aria-label="Fullscreen"
            >
              <img src={fullScreen_svg} alt="Fullscreen" className="w-6 h-6 md:w-5 md:h-5" />
            </button>
          </div>
        </>
      ) : (
        <div className="text-red-500 text-center">Invalid YouTube URL</div>
      )}
    </div>
  );
}

export default VideoPlayer;

// TODO
// Mobile screen: video controls not showing after auto-hidden after 3 seconds in full-screen mode.
// Both screens: 'position: 'relative' Issue.   