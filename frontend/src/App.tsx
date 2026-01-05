import { useState } from 'react'
import Video from './components/video/Video'
import './App.css'

function App() {
  const switchToChatbot = () => setCurrentMode('chatbot')
  const switchToVideo = () => setCurrentMode('video')

  
  const [currentMode, setCurrentMode] = useState('video')

  return (
    <div>
      {currentMode === 'video' ? 
        <Video 
          onSwitchMode={switchToChatbot}
        /> : 
        <>
        {/* chatbot */}
        </>
      }
    </div>
  )
}

export default App
