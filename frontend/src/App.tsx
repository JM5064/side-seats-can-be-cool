import { useState } from 'react'
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { MobileNavigationHeader } from "@/components/application/app-navigation/base-components/mobile-header"
import { ThemeToggle } from '@/components/base/theme-toggle';
import Toggle from '@/components/Toggle'
import Video from '@/components/video/Video'
import Chatbot from '@/components/chatbot/Chatbot'
import { type Course } from '@/types/Course'
import BackendTest from '@/components/BackendTest'
import '@/App.css'

function App() {

  const [currentMode, setCurrentMode] = useState('chatbot')
  const [currentClass, setCurrentClass] = useState<Course>({ title: "math", id: 1 })

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

  const content = (
    <span className="w-full flex items-center justify-between">
      <span className="prose"><h1>{currentClass.title}</h1></span>
      <Toggle mode={currentMode} setModeFunc={setCurrentMode} />
    </span>
  )

  const trailingContent = (
    <ThemeToggle />
  )

  const sidebarContent = (
    <SidebarNavigationSimple
      activeItem={currentClass.title}
      activeItemFunc={setCurrentClass}
      items={allClasses}
    />
  )

  return (
    <div className='flex flex-row'>
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

          {currentMode === 'video' ?
            <Video /> :
            <Chatbot currentClass={currentClass}/>
          }
      </div>

      {/* <BackendTest /> */}
    </div>
  )
}

export default App
