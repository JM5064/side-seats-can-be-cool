import type { FC, HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { Link as AriaLink } from "react-aria-components";
import { cx, sortCx } from "@/utils/cx";

const styles = sortCx({
    root: "group relative flex w-full cursor-pointer items-center rounded-md bg-primary outline-focus-ring transition duration-100 ease-linear select-none hover:bg-primary_hover focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2",
    rootSelected: "bg-active hover:bg-secondary_hover",
});

interface NavItemBaseProps {
    /** Whether the nav item shows only an icon. */
    iconOnly?: boolean;
    /** Icon component to display. */
    icon?: FC<HTMLAttributes<HTMLOrSVGElement>>;
    /** Content to display. */
    children?: ReactNode;
    /** Whether the nav item is currently active. */
    current?: boolean;
    /** Whether to truncate the label text. */
    truncate?: boolean;
    /** Handler for click events. */
    onItemClick: MouseEventHandler;
}

export const NavItemBase = ({ current, icon: Icon, children, truncate = true, onItemClick }: NavItemBaseProps) => {
    const iconElement = Icon && <Icon aria-hidden="true" className="mr-2 size-5 shrink-0 text-fg-quaternary transition-inherit-all" />;

    const labelElement = (
        <span
            className={cx(
                "flex-1 text-md font-semibold text-secondary transition-inherit-all group-hover:text-secondary_hover",
                truncate && "truncate",
                current && "text-secondary_hover",
            )}
        >
            {children}
        </span>
    );

    return (
        <AriaLink
            rel="noopener noreferrer"
            className={cx("px-3 py-2", styles.root, current && styles.rootSelected)}
            onClick={onItemClick}
            aria-current={current ? "page" : undefined}
        >
            {iconElement}
            {labelElement}
        </AriaLink>
    );
};
