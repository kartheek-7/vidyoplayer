import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";
import { useVideoData } from './videocontext';

const Waveform = ({videoURL}) => {
  const waveform = useRef(null);
  const [,,,,isPlaying,setIsPlaying]=useVideoData();

  useEffect(() => {
    const initializeWaveform = async () => {
      if (!waveform.current) {
        waveform.current = Wavesurfer.create({
          container: "#waveform",
          waveColor: "#567FFF",
          barGap: 3,
          barWidth: 3,
          barRadius: 10,
          cursorWidth: 1,
          cursorColor: "#567FFF",
          interact: false,
          fillParent: true,
        });
        console.log("audioURL from 2.js", videoURL);
        waveform.current.load(videoURL);
        // Load local audio file
        /*const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const blob = new Blob([arrayBuffer]);
        waveform.current.loadBlob(blob);*/
      }
    };

    initializeWaveform();

    if (waveform.current) {
      if (isPlaying) {
        waveform.current.play();
      } else {
        waveform.current.pause();
      }
    }

    
  }, [videoURL, isPlaying]);

  return (
    <div>
      <div id="waveform" />
    </div>
  );
};

export default Waveform;