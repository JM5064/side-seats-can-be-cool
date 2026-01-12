import type { FC } from "react";

export type NavItemType = {
    /** Label text for the nav item. */
    label: string;
    // /** Unique identifier for item */
    // id: string;
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
