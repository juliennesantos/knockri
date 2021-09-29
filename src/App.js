import React from 'react';
import { Feed } from './features/feed/Feed';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import "../node_modules/video-react/dist/video-react.css";

function App() {
  return (
    <div className="App">
      <Feed />
    </div>
  );
}

export default App;
