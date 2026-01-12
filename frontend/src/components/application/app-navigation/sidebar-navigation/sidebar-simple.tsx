import { cx } from "@/utils/cx";
import { NavList } from "../base-components/nav-list";
import type { NavItemType } from "../config";
import type { Key } from "react-aria-components";

interface SidebarNavigationProps {
    /** Name/index of currently active item*/
    activeItem: Key;
    /** function to call when an item is clicked */
    activeItemFunc: React.Dispatch<React.SetStateAction<string>>;
    /** List of items to display. */
    items: NavItemType[];
    /** Additional CSS classes to apply to the sidebar. */
    className?: string;
}

export const SidebarNavigationSimple = ({
    activeItem,
    activeItemFunc,
    items,
    className,
}: SidebarNavigationProps) => {
    const MAIN_SIDEBAR_WIDTH = 296;

    const content = (
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
            <div className="flex flex-col gap-5 px-2 py-4 lg:px-4 lg:py-6">
                <h1>sidebar</h1>
            </div>

            <NavList activeItem={activeItem} items={items} 
                activeItemFunc={activeItemFunc} />

            <div className="mt-auto flex flex-col gap-4 px-2 py-4 lg:px-4 lg:py-6">
                ????
            </div>
        </aside>
    );

    return ( 
        content
        // <>
        //     {/* Mobile header navigation */}
        //     <MobileNavigationHeader>{content}</MobileNavigationHeader>

        //     {/* Desktop sidebar navigation */}
        //     <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex">{content}</div>

        //     {/* Placeholder to take up physical space because the real sidebar has `fixed` position. */}
        //     <div
        //         style={{
        //             paddingLeft: MAIN_SIDEBAR_WIDTH,
        //         }}
        //         className="invisible hidden lg:sticky lg:top-0 lg:bottom-0 lg:left-0 lg:block"
        //     />
        // </>
    );
};