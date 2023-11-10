import React, { createContext, useContext, useState } from "react";

const VideoDataContext = createContext();

export function VideoDataProvider({ children }) {
  const [videoURL, setVideoURL] = useState(null);
  const [videoName, setVideoName] = useState("");
  const [isPlaying, setIsPlaying]=useState(false);

  return (
    <VideoDataContext.Provider value={[videoURL, setVideoURL,videoName, setVideoName, isPlaying, setIsPlaying]}>
      {children}
    </VideoDataContext.Provider>
  );
}

export function useVideoData() {
  const context = useContext(VideoDataContext);
  if (!context) {
    throw new Error("useVideoData must be used within a VideoDataProvider");
  }
  return context;
}
