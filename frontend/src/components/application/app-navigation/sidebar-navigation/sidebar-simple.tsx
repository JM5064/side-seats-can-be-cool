import { cx } from "@/utils/cx";
import type { PropsWithChildren } from "react";

interface SidebarNavigationProps {
    /** Name/index of currently active item*/
    // activeItem: Course;
    /** function to call when an item is clicked */
    // activeItemFunc: React.Dispatch<React.SetStateAction<Course>>;
    /** List of items to display. */
    // items: Course[];
    /** Additional CSS classes to apply to the sidebar. */
    className?: string;
}

export const SidebarNavigationSimple = ({ children, className }: PropsWithChildren<SidebarNavigationProps>) => {
    const MAIN_SIDEBAR_WIDTH = 296;

    return (
        <aside
            style={
                {
                    "--width": `${MAIN_SIDEBAR_WIDTH}px`,
                } as React.CSSProperties
            }
            className={cx(
                "flex h-full w-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4 lg:w-(--width) lg:pt-6 border-secondary md:border-r",
                className,
            )}
        >
            <div className="flex flex-col gap-5 px-4 lg:px-6 prose">
                <h1>Side seats can be cool</h1>
            </div>

            <div className="mb-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                {children}
            </div>

        </aside>
    );
};