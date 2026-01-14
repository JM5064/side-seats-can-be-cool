import type { FC } from "react";
import type { Key } from "react-aria-components";

export type NavItemType = {
    /** Label text for the nav item. */
    label: string;
    // /** Unique identifier for item */
    id: Key;
    /** Icon component to display. */
    icon?: FC<{ className?: string }>;
    /** Whether this nav item is a divider. */
    divider?: boolean;
};

export type NavItemDividerType = Omit<NavItemType, "icon" | "label" | "divider"> & {
    /** Label text for the divider. */
    label?: string;
    /** Whether this nav item is a divider. */
    divider: true;
};
