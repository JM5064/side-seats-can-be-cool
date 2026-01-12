import { useState } from "react";
import type { Key } from "react-aria-components";
import { Tabs } from "@/components/application/tabs/tabs";

const tabs = [
    { id: 'video', label: "Video" },
    { id: 'chatbot', label: "Chatbot" }
];

type ToggleProps = {
    mode: string,
    setModeFunc: React.Dispatch<React.SetStateAction<string>>
}

const Toggle = ({ mode, setModeFunc }: ToggleProps) => {
    const [selectedTab, setSelectedTab] = useState<Key>(mode);

    return (
        <Tabs
            selectedKey={selectedTab}
            onSelectionChange={(k) => {
                setSelectedTab(k);
                setModeFunc(k as string)
            }}
        >
            <Tabs.List type="button-border" items={tabs}>
                {(tab) => <Tabs.Item {...tab} />}
            </Tabs.List>
        </Tabs>
    );
};

export default Toggle