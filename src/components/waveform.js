import Wavesurfer from "wavesurfer.js";
import { useEffect, useRef } from "react";
import { useVideoData } from './videocontext';

const Waveform = ({ videoURL }) => {
  const waveform = useRef(null);
  const [,,,, isPlaying, setIsPlaying] = useVideoData();

  useEffect(() => {
    const initializeWaveform = async () => {

      if (waveform.current) {
        waveform.current.destroy();
      }

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

      waveform.current.on('error', (error) => {
        console.error('Wavesurfer error:', error);
      });

      waveform.current.load(videoURL);
    };

    if (videoURL) {
      initializeWaveform();
    }

    return () => {
     
      if (waveform.current) {
        waveform.current.destroy();
      }
    };
  }, [videoURL]);

  useEffect(() => {
    if (waveform.current) {
      if (isPlaying) {
        waveform.current.play();
      } else {
        waveform.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div>
      <div id="waveform" />
    </div>
  );
};

export default Waveform;
