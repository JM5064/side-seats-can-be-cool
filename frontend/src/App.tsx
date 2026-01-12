import { useState } from 'react'
import Video from '@/components/video/Video'
import Chatbot from '@/components/chatbot/Chatbot'
import Toggle from '@/Toggle'
import '@/App.css'

function App() {

  const [currentMode, setCurrentMode] = useState('video')

  return (
    <div>
      <Toggle mode={currentMode} toggleFunc={setCurrentMode}/>
      {currentMode === 'video' ? 
        <Video/> : 
        <Chatbot/>
      }
    </div>
  )
}

export default App
