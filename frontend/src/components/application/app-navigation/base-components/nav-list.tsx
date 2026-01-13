import { cx } from "@/utils/cx";
import type { NavItemDividerType, NavItemType } from "../config";
import type { Key } from "react-aria-components";
import { NavItemBase } from "./nav-item";
import { useState } from "react";

interface NavListProps {
    /** Name/index of currently */
    activeItem: Key;
    /** function to call when an item is clicked */
    activeItemFunc: React.Dispatch<React.SetStateAction<string>>;
    /** List of items to display. */
    items: (NavItemType | NavItemDividerType)[];
    /** Additional CSS classes to apply to the list. */
    className?: string;
}

export const NavList = ({ activeItem, activeItemFunc, items, className }: NavListProps) => {
    const [selectedItem, setSelectedItem] = useState<Key>(activeItem);

    return (
        <ul className={cx("flex flex-col", className)}>
            {items.map((item, index) => {
                if (item.divider) {
                    return (
                        <li key={index} className="w-full px-0.5 py-2">
                            <hr className="h-px w-full border-none bg-border-secondary" />
                        </li>   
                    );
                }

                return (
                    <li key={index} className="py-0.5">
                        <NavItemBase
                            icon={item.icon}
                            current={selectedItem === item.label}
                            onItemClick={(e) => {
                                setSelectedItem(item.label);
                                activeItemFunc(item.label)
                            }}
                            // current={selectedItem === item.id}
                            // onItemClick={(e) => {
                            //     setSelectedItem(item.id);
                            //     activeItemFunc(item.id)
                            // }}
                        >
                            {item.label}
                        </NavItemBase>
                    </li>
                );
            })}
        </ul>
    );
};
