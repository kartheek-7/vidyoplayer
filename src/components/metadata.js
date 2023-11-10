import React, { useEffect, useState } from 'react';
import { useVideoData } from './videocontext';
import '../styles/metadata.css';

const Metadata = () => {
  const [videoURL, setVideoURL, videoName] = useVideoData();
  const [videoDuration, setVideoDuration] = useState('');
  const [frameRate, setFrameRate] = useState(0);

  const fileDetails = videoName || {};
  const fileName = fileDetails.name || '';
  const fileType = fileDetails.type || '';
  const fileSize = fileDetails.size || '';
  const fileLastModified = fileDetails.lastModified || '';
  const fileLastModifiedDate = fileDetails.lastModifiedDate || '';

  useEffect(() => {
    if (videoURL) {
      const videoElement = document.createElement('video');
      videoElement.src = videoURL;

      videoElement.onloadedmetadata = () => {
        const durationInSeconds = videoElement.duration;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = Math.floor(durationInSeconds % 60);
        const formattedDuration = `${minutes}min ${seconds}sec`;
        setVideoDuration(formattedDuration);

        const totalFrames = 60 * durationInSeconds;
        calculateFrameRate(durationInSeconds, totalFrames);
      };
    }
  }, [videoURL]);

  const calculateFrameRate = (durationInSeconds, totalFrames) => {
    if (durationInSeconds > 0) {
      const fps = totalFrames / durationInSeconds;
      setFrameRate(fps);
    } else {
      setFrameRate(0);
    }
  };

  return (
    <div className="metadata-container">
      {fileName && (
        <div className="metadata-item">
          <label>File Name:</label>
          <p>{fileName}</p>
        </div>
      )}
      {fileType && (
        <div className="metadata-item">
          <label>File Type:</label>
          <p>{fileType}</p>
        </div>
      )}
      {fileSize && (
        <div className="metadata-item">
          <label>File Size:</label>
          <p>{fileSize} bytes</p>
        </div>
      )}
      {fileLastModified && (
        <div className="metadata-item">
          <label>Last Modified:</label>
          <p>{fileLastModified}</p>
        </div>
      )}
      {fileLastModifiedDate && (
        <div className="metadata-item">
          <label>Last Modified Date:</label>
          <p>{fileLastModifiedDate.toString()}</p>
        </div>
      )}
      {videoDuration && (
        <div className="metadata-item">
          <label>Video Duration:</label>
          <p>{videoDuration}</p>
        </div>
      )}
    </div>
  );
};

export default Metadata;
