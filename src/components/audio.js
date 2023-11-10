import React, { useRef, useState, useEffect } from 'react';
import Waveform from './waveform';

const AudioExtractor = ({ videoURL }) => {
  const audioContextRef = useRef(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = audioContext;

    if (videoURL) {
      fetch(videoURL)
        .then((response) => response.arrayBuffer())
        .then(async (data) => {
          const buffer = await audioContext.decodeAudioData(data);
          setAudioBuffer(buffer);
          setAudioURL(URL.createObjectURL(new Blob([data], { type: 'audio/wav' })));
        })
        .catch((error) => {
          console.error('Error fetching or decoding audio data:', error);
        });
        const audioContext = audioContextRef.current;

        if (audioContext && audioBuffer) {
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
            source.start();
          
        }
    }

    return () => {
      // Clean up resources on component unmount
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [videoURL]);

  const playPauseAudio = () => {
    const audioContext = audioContextRef.current;

    if (audioContext && audioBuffer) {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);

      if (isPlaying) {
        source.stop();
      } else {
        source.start();
      }

      setIsPlaying(!isPlaying);
    }
  };

  const downloadAudio = () => {
    // Trigger download by creating an anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = audioURL;
    downloadLink.download = 'audio.wav';
    downloadLink.click();
  };
console.log("audioURL from 1.js", audioURL);
  return (
    <div>
      {audioURL && (
        <div>
          <audio controls src="/a1.mp3"></audio>

          <p>Audio extracted successfully!</p>
          <Waveform url={"/a1.mp3"}/>
          <button onClick={playPauseAudio}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={downloadAudio}>Download</button>
        </div>
      )}
    </div>
  );
};

export default AudioExtractor;
