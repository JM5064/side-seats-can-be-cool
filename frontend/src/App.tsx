import { useState } from 'react'
import Video from '@/components/video/Video'
import Chatbot from '@/components/chatbot/Chatbot'
import '@/App.css'

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
        <Chatbot
          onSwitchMode={switchToVideo}
        />
      }
    </div>
  )
}

export default App
