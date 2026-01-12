import { MobileNavigationHeader } from "@/components/application/app-navigation/base-components/mobile-header"
import { NavAccountCard } from "@/components/application/app-navigation/base-components/nav-account-card"
import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { ThemeToggle } from '@/components/base/theme-toggle';
import type { NavItemType } from "@/components/application/app-navigation/config";
import Toggle from '@/components/Toggle'

type MobileProps = {
    currentClass: string;
    currentMode: string;
    setModeFunc: React.Dispatch<React.SetStateAction<string>>;
    classes: NavItemType[];
    setClassFunc: React.Dispatch<React.SetStateAction<string>>
}

const MobileHeaderSidebar = ({ currentClass, currentMode, setModeFunc, classes, setClassFunc }: MobileProps) => {
    const content = (
        <span className="w-full flex items-center justify-between">
            <h1>{currentClass}</h1>
            <Toggle mode={currentMode} setModeFunc={setModeFunc} />
        </span>
    )

    const trailingContent = (
        <ThemeToggle />
    )

    return (
        <MobileNavigationHeader content={content}>
            <aside className="flex h-full w-full flex-col justify-between overflow-auto border-r border-secondary bg-primary pt-4 lg:pt-6">
                <div className="flex flex-col gap-5 px-4 lg:px-5">
                    <SidebarNavigationSimple
                        activeItem={currentClass}
                        activeItemFunc={setClassFunc}
                        items={classes}
                    />
                </div>

                <div className="mt-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                    <div className="flex flex-col gap-1">
                        {trailingContent}
                    </div>

                    {/* <NavAccountCard /> */}
                </div>
            </aside>
        </MobileNavigationHeader>
    )
}

export default MobileHeaderSidebar