import VideoPlayer from "./components/videoplayer";
import { VideoDataProvider } from "./components/videocontext";
import Uploader from "./components/uploader";
import Metadata from "./components/metadata";
import Waveform from "./components/waveform";
import "./App.css"; 

function App() {
  return (
    <VideoDataProvider>
      {/*<Uploader className="uploader"/>*/}
      <div className="app-container">
        <div className="left-panel"> 
          <VideoPlayer />
        </div>
        <div className="right-panel">
          <Metadata />
        </div>
      </div>
      {/*<Waveform />*/}
    </VideoDataProvider>
  );
}

export default App;
