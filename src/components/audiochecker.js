import React, { useEffect, useRef } from 'react';

const AudioChecker = ({ videoURL }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    // Check if the video has audio when the component mounts
    checkAudio();

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', checkAudio);
      }
    };
  }, [videoURL]);

  const checkAudio = () => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (
        (typeof video.mozHasAudio !== 'undefined' && video.mozHasAudio) ||
        (typeof video.webkitAudioDecodedByteCount !== 'undefined' &&
          video.webkitAudioDecodedByteCount > 0) ||
        Boolean(video.audioTracks?.length)
      ) {
        console.log('This video has audio tracks.');
      } else {
        console.log('This video has no audio tracks.');
      }
    }
  };

  return (
    <div>
      <video ref={videoRef} src={videoURL} style={{ display: 'none' }} onLoadedData={checkAudio} />
    </div>
  );
};

export default AudioChecker;
