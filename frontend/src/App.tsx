import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import MobileHeaderSidebar from '@/components/MobileHeaderSidebar'
import Video from '@/components/video/Video'
import Chatbot from '@/components/chatbot/Chatbot'
import BackendTest from '@/components/BackendTest'
import '@/App.css'

function App() {

  const [currentMode, setCurrentMode] = useState('chatbot')
  const [currentClass, setCurrentClass] = useState('math')
  // const [currentClass, setCurrentClass] = useState('testClass')

  const allClasses = [
    {
      label: "math",
      // id: "testClass",
    },
    {
      label: "also math",
      // id: "anotherClass",
    },
  ]

  return (
    <div className='flex flex-row'>
      <Sidebar currentClass={currentClass} setClassFunc={setCurrentClass} classes={allClasses} />

      <div className='h-svh w-svw flex flex-col bg-primary'>
          <Header currentClass={currentClass} currentMode={currentMode} setModeFunc={setCurrentMode} />

          <MobileHeaderSidebar
            currentClass={currentClass} currentMode={currentMode} setModeFunc={setCurrentMode}
            setClassFunc={setCurrentClass} classes={allClasses} />

          {currentMode === 'video' ?
            <Video /> :
            <Chatbot />
          }
      </div>

      {/* <BackendTest /> */}
    </div>
  )
}

export default App
