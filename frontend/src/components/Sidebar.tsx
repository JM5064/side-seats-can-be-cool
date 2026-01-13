import { SidebarNavigationSimple } from "@/components/application/app-navigation/sidebar-navigation/sidebar-simple";
import { type Course } from "@/types/Course";
import type { NavItemType } from "./application/app-navigation/config";

type SidebarProps = {
    currentClass: Course,
    classes: NavItemType[];
    setClassFunc: React.Dispatch<React.SetStateAction<Course>>
}

const Sidebar = ({ currentClass, setClassFunc, classes }: SidebarProps) => (
    <>
        {/* Desktop sidebar navigation */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">
            <SidebarNavigationSimple
                activeItem={currentClass.title}
                activeItemFunc={setClassFunc}
                items={classes}
            />
        </div>

        {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
        <div
            style={{
                paddingLeft: 296,
            }}
            className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
        />
    </>
);

export default Sidebar