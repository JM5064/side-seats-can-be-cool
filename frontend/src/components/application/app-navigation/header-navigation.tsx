import type { ReactNode } from "react";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { cx } from "@/utils/cx";
import { NavAccountMenu } from "./base-components/nav-account-card";

interface HeaderNavigationBaseProps {
    /** Content to display in the front */
    content: ReactNode;
    /** Content to display in the trailing position. */
    trailingContent?: ReactNode;
    /** Whether to show the avatar dropdown. */
    showAvatarDropdown?: boolean;
}

export const HeaderNavigationBase = ({
    content,
    trailingContent,
    showAvatarDropdown = true
}: HeaderNavigationBaseProps) => {
    return (
        <>
            <header className="max-lg:hidden">
                <section
                    className="flex h-16 w-full items-center justify-center bg-primary md:h-18 border-b border-secondary"
                >
                    <div className="flex w-full max-w-container gap-4 pr-3 pl-4 md:px-8">
                        <nav className="flex-1">
                            {content}
                        </nav>

                        <div className="flex flex-none items-center gap-3">
                            {trailingContent}

                            {showAvatarDropdown && (
                                <DialogTrigger>
                                    <AriaButton
                                        className={({ isPressed, isFocused }) =>
                                            cx(
                                                "group relative inline-flex cursor-pointer",
                                                (isPressed || isFocused) && "rounded-full outline-2 outline-offset-2 outline-focus-ring",
                                            )
                                        }
                                    >
                                        <Avatar alt="Olivia Rhye" src="https://www.untitledui.com/images/avatars/olivia-rhye?bg=%23E0E0E0" size="md" />
                                    </AriaButton>
                                    <Popover
                                        placement="bottom right"
                                        offset={8}
                                        className={({ isEntering, isExiting }) =>
                                            cx(
                                                "will-change-transform",
                                                isEntering &&
                                                "duration-300 ease-out animate-in fade-in placement-right:slide-in-from-left-2 placement-top:slide-in-from-bottom-2 placement-bottom:slide-in-from-top-2",
                                                isExiting &&
                                                "duration-150 ease-in animate-out fade-out placement-right:slide-out-to-left-2 placement-top:slide-out-to-bottom-2 placement-bottom:slide-out-to-top-2",
                                            )
                                        }
                                    >
                                        <NavAccountMenu />
                                    </Popover>
                                </DialogTrigger>
                            )}
                        </div>
                    </div>
                </section>
            </header>
        </>
    );
};