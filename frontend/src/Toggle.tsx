import { useState } from "react";
import type { Key } from "react-aria-components";
import { Tabs } from "@/components/application/tabs/tabs";
import { NativeSelect } from "@/components/base/select/select-native";

const tabs = [
    { id: 'video', label: "Video" },
    { id: 'chatbot', label: "Chatbot" }
];

interface Props {
    mode : string,
    toggleFunc : React.Dispatch<React.SetStateAction<string>>
}

const Toggle = ({mode, toggleFunc} : Props) => {
    const [selectedTab, setSelectedTab] = useState<Key>(mode);

    return (
        <div>
            <NativeSelect
                aria-label="Tabs"
                value={selectedTab}
                onChange={(e) => {
                    setSelectedTab(e.target.value);
                    toggleFunc(e.target.value)
                }}
                options={tabs.map((tab) => ({ label: tab.label, value: tab.id }))}
                className="w-80 md:hidden"
            />
            <Tabs 
                selectedKey={selectedTab} 
                onSelectionChange={(k) => {
                    setSelectedTab(k);
                    toggleFunc(k as string)
                }} 
                className="w-max max-md:hidden"
            >
                <Tabs.List type="button-border" items={tabs}>
                    {(tab) => <Tabs.Item {...tab} />}
                </Tabs.List>
            </Tabs>
        </div>
    );
};

export default Toggle