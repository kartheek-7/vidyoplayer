import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { FaPause } from 'react-icons/fa';
import { BsFillPauseFill } from 'react-icons/bs';
import { MdPause } from 'react-icons/md';

import '../styles/progressbar.css';

const ProgressBar = (props) => {
  const { isPlaying, progress } = props;

  const circleStyle = {
    left: `calc(${progress}%)`,
  };

  return (
    <div className="progress-bar-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          <div className="circle" style={circleStyle}></div>
        </div>
        {/*<div className='play-pause-icon2'>
        {isPlaying ? <FaPause size={14} /> : <FaPlay size={14} />}
  </div>*/}
      </div>
      
      
    </div>
  );
};

export default ProgressBar;
