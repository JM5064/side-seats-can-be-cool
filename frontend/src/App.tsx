import { useEffect, useState } from 'react'
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { MobileNavigationHeader } from "@/components/application/app-navigation/base-components/mobile-header"
import { ThemeToggle } from '@/components/base/theme-toggle';
import Toggle from '@/components/Toggle'
import Video from '@/components/video/Video'
import Chatbot from '@/components/chatbot/Chatbot'
import { type Course } from '@/types/Course'
import { NavList } from "@/components/application/app-navigation/base-components/nav-list";
import { Button } from "@/components/base/buttons/button";
import { Plus } from "@untitledui/icons";
import '@/App.css'
import NewClassModal from './components/chatbot/NewClassModal';
import BackendTest from './components/BackendTest';

function App() {

  const [allClasses, setAllClasses] = useState<Course[]>([])
  const [currentMode, setCurrentMode] = useState('chatbot')
  const [currentClass, setCurrentClass] = useState<Course>(allClasses[0])
  const [showModal, setShowModal] = useState<boolean>(false)


  const content = (
    <span className="w-full flex items-center justify-between">
      <span className="prose">
        {currentClass ?
          <h1>{currentClass.title}</h1> :
          <p>Welcome, please add a class</p>}
      </span>
      {currentClass && <Toggle mode={currentMode} setModeFunc={setCurrentMode} />}
    </span>
  )

  const trailingContent = (
    <ThemeToggle />
  )

  const sidebarContent = (
    <SidebarNavigationSimple>
      {currentClass && <NavList activeItem={currentClass} items={allClasses}
        activeItemFunc={setCurrentClass} />}
      <Button
        onClick={() => { setShowModal(true) }}
        iconLeading={Plus}
        color="tertiary"
        size="md">
        Add class
      </Button>
    </SidebarNavigationSimple>
  )

  useEffect(() => {
    const fetchCourses = async () => {
      const res = await fetch(`http://127.0.0.1:5000/getcourses`, {
        method: "GET",
        credentials: "include"
      });
    
      const data = await res.json()

      if (data.status === "ok") {
        const courses = data.courses
        
        setAllClasses(courses)
      }
    }
    
    fetchCourses()
  }, [])

  return (
    <div className='flex flex-row'>

      {showModal && <NewClassModal allClasses={allClasses} setAllClasses={setAllClasses} setCurrentClass={setCurrentClass} closeFunc={setShowModal} />}

      {/* Desktop sidebar navigation */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">
        {sidebarContent}
      </div>

      {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
      <div
        style={{
          paddingLeft: 296,
        }}
        className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
      />

      <div className='h-svh w-svw flex flex-col bg-primary'>

        {/* Desktop header */}
        <HeaderNavigationBase
          content={content}
          trailingContent={trailingContent}
          showAvatarDropdown={false}
        />

        {/* Mobile header plus sidebar */}
        <MobileNavigationHeader content={content}>
          <aside className="flex h-full w-full flex-col justify-between overflow-auto border-r border-secondary bg-primary pt-4 lg:pt-6">
            <div className="flex flex-col gap-5 px-4 lg:px-5">
              {sidebarContent}
            </div>

            <div className="mt-auto w-min flex flex-col gap-4 px-6 py-8">
              {trailingContent}
            </div>
          </aside>
        </MobileNavigationHeader>

        {currentClass && (currentMode === 'video' ?
          <Video currentClass={currentClass} /> :
          <Chatbot currentClass={currentClass} />)}
      </div>

      {/* <BackendTest /> */}
    </div>
  )
}

export default App
