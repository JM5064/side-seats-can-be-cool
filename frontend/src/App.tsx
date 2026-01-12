import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import MobileHeaderSidebar from '@/components/MobileHeaderSidebar'
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
    <>
      <Sidebar currentClass={currentClass} setClassFunc={setCurrentClass} classes={allClasses} />

      <Header currentClass={currentClass} currentMode={currentMode} setModeFunc={setCurrentMode} />
      
      <MobileHeaderSidebar 
      currentClass={currentClass} currentMode={currentMode} setModeFunc={setCurrentMode}
      setClassFunc={setCurrentClass} classes={allClasses} />

      {/* {mode === 'video' ?
                <Video /> :
                <Chatbot />
            } */}
    </>
  )
}

export default App
