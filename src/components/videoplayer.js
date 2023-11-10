import React, { useState, useRef, useEffect } from 'react';
import { useVideoData } from './videocontext';
import '../styles/videoplayer.css';
import { FaPlay } from 'react-icons/fa';
import Uploader from './uploader';
import Waveform from './waveform';
import AudioExtractor from './audio';
import ProgressBar from './progressbar';

const VideoPlayer = () => {
  const canvasRef = useRef(null);
  const [videoURL, setVideoURL, videoName, setVideoName, isPlaying, setIsPlaying] = useVideoData();
  const [progress, setProgress] = useState(0);
  const [videoElement, setVideoElement] = useState(null);

  const handleVideoClick = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      playVideo();
    } else {
      setIsPlaying(false);
      pauseVideo();
    }
  };

  // ... rest of your component
  const playVideo = () => {
    if (videoElement) {
      videoElement.play().catch((error) => {
        console.error('Error playing the video:', error);
      });
    }
  };

  const pauseVideo = () => {
    if (videoElement) {
      videoElement.pause();
    }
  };

  // Function to update the progress bar
  const updateProgressBar = () => {
    if (videoElement && videoElement.duration) {
      const currentTime = videoElement.currentTime;
      const duration = videoElement.duration;
      const calculatedProgress = (currentTime / duration) * 100;
      setProgress(calculatedProgress);
    }
  };

  // Use an effect to continuously update the progress
  useEffect(() => {
    if (videoElement) {
      videoElement.addEventListener('timeupdate', updateProgressBar);
    }
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('timeupdate', updateProgressBar);
      }
    };
  }, [videoElement]);

  // Use an effect to draw video frames on the canvas
  useEffect(() => {
    if (videoURL && isPlaying) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (canvas && ctx && videoElement) {
        videoElement.addEventListener('play', () => {
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          const x=canvas.height/canvas.width;
          canvas.width=920;
          canvas.height= x * 920;
          if(x>1.5){
            canvas.width=320;
            canvas.height= x * 320;
          }
          const drawVideoFrame = () => {
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            requestAnimationFrame(drawVideoFrame);
          };

          drawVideoFrame();
        });
      }
    }
  }, [videoURL, isPlaying, canvasRef, videoElement]);

  return (
    <div className='container'>
      <Uploader className='uploader' />
      {videoURL && (
        <div className='canvas-container' onClick={handleVideoClick}>
          <canvas ref={canvasRef} className='canvas-element'></canvas>
          {isPlaying ? null : (
            <div className='play-pause-icon'>
              <FaPlay size={48} color='#8080ff' />
            </div>
          )}
          {/*<ProgressBar progress={progress} isPlaying={isPlaying} className='progressbar' />*/}
          
        </div>
      )}
      {videoURL && <video ref={setVideoElement} src={videoURL} style={{ display: 'none' }}></video> }
      
    </div>
  );
};

export default VideoPlayer;