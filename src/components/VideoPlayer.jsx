import React, { useEffect, useState, useRef } from 'react';
import play_svg from '../assets/SVGs/videoplayer_SVGs/play_svg.svg';
import pause_svg from '../assets/SVGs/videoplayer_SVGs/pause_svg.svg';
import seek10_svg from '../assets/SVGs/videoplayer_SVGs/seek10_svg.svg';
import seek10back_svg from '../assets/SVGs/videoplayer_SVGs/seek10back_svg.svg';
import fullScreen_svg from '../assets/SVGs/videoplayer_SVGs/fullScreen_svg.svg';
import mute_svg from '../assets/SVGs/videoplayer_SVGs/mute_svg.svg';
import pbSpeed_svg from '../assets/SVGs/videoplayer_SVGs/pbSpeed_svg.svg';
import volume_svg from '../assets/SVGs/videoplayer_SVGs/volume_svg.svg';

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

  const [player, setPlayer] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverTime, setHoverTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(50);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const speedMenuRef = useRef(null);

  const playerContainerRef = useRef(null);

  const speedOptions = [0.25, 0.5, 0.75, 1, 1.5, 1.75, 2];

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
    };
  }, [videoId]);

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

  // Initialize the YouTube player
  const initializePlayer = () => {
    const newPlayer = new window.YT.Player('player', {
      height: '340',
      width: '60%',
      videoId: videoId,
      playerVars: {
        controls: 0,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        modestbranding: 1,
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
    setPlayer(newPlayer);
  };

  // Update current time for seek bar
  useEffect(() => {
    let interval;
    if (player) {
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

  // Custom control handlers
  const togglePlayPause = () => {
    if (player) {
      if (isPlaying) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
    }
  };

  const handleSeek = (seconds) => {
    if (player) {
      player.seekTo(seconds, true);
      setCurrentTime(seconds);
    }
  };

  const handleSeekBy = (seconds) => {
    if (player) {
      const newTime = Math.max(0, Math.min(player.getCurrentTime() + seconds, duration));
      handleSeek(newTime);
    }
  };

  const handleVolumeChange = (e) => {
    if (player) {
      const volume = parseInt(e.target.value);
      player.setVolume(volume);
      setPreviousVolume(volume); // Update the previous volume reference
      setIsMuted(volume === 0); // Mute state should match if volume is 0
    }
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

  const toggleMute = () => {
    if (player) {
      if (isMuted) {
        player.unMute();
        player.setVolume(previousVolume); 
      } else {
        setPreviousVolume(player.getVolume());
        player.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const handleSpeedChange = (speed) => {
    if (player) {
      player.setPlaybackRate(speed);
      setPlaybackRate(speed);
    }
    setShowSpeedMenu(false);
  };

  return (
    <div className="p-2 md:p-5" ref={playerContainerRef}>
      {videoId ? (
        <>
          <div id="player"></div>
          <div className="flex flex-wrap gap-1 md:gap-2 items-center justify-between max-w-[60%] p-1 mt-2 bg-white rounded">
            {/* Combined Play/Pause Button */}
            <button 
              className="text-white hover:cursor-pointer hover:scale-105 transition-transform active:scale-95"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              <img 
                src={isPlaying ? play_svg : pause_svg} 
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
            <div className="relative w-full md:w-80 order-last md:order-none">
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
                <img src={isMuted ? mute_svg : volume_svg} alt={isMuted ? "Unmute" : "Mute"} className="w-8 h-8 md:w-7 md:h-7"/>
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