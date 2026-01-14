import { cx } from "@/utils/cx";
import type { Key } from "react-aria-components";
import { NavItemBase } from "./nav-item";
import { useState } from "react";
import type { Course } from "@/types/Course";

interface NavListProps {
    /** Name/index of currently */
    activeItem: Course;
    /** function to call when an item is clicked */
    activeItemFunc: React.Dispatch<React.SetStateAction<Course>>;
    /** List of items to display. */
    items: Course[];
    /** Additional CSS classes to apply to the list. */
    className?: string;
}

export const NavList = ({ activeItem, activeItemFunc, items, className }: NavListProps) => {
    const [selectedItem, setSelectedItem] = useState<Key>(activeItem.id);

    return (
        <ul className={cx("flex flex-col", className)}>
            {items.map((item, index) => {
                if (item.isNull) {
                    return (
                        <></>
                    );
                }

                return (
                    <li key={index} className="py-0.5">
                        <NavItemBase
                            // icon={item.icon}
                            current={selectedItem === item.id}
                            onItemClick={(e) => {
                                setSelectedItem(item.id);
                                activeItemFunc(item)
                            }}
                        >
                            {item.title}
                        </NavItemBase>
                    </li>
                );
            })}
        </ul>
    );
};
