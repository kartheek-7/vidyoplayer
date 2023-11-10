import React from 'react';
import { useVideoData } from './videocontext';
import AudioExtractor from './audio'; // Import the AudioExtractor component
import Waveform from './waveform';

const Uploader = () => {
  const [videoURL, setVideoURL,videoName, setVideoName] = useVideoData();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setVideoName(file);

    const reader = new FileReader();
    reader.onload = () => {
      const newVideoURL = URL.createObjectURL(file);
      setVideoURL(newVideoURL);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} accept="video/*" className="file-input" />
{videoURL && (
        // Pass videoURL to the AudioExtractor component
        //<AudioExtractor videoURL={videoURL} />
        <Waveform videoURL={videoURL}/>
)}
    </div>
  );
};

export default Uploader;
