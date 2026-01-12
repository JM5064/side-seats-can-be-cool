import { HeaderNavigationBase } from "@/components/application/app-navigation/header-navigation";
import { ThemeToggle } from '@/components/base/theme-toggle';
import Toggle from '@/components/Toggle'

type HeaderProps = {
    currentClass: string
    currentMode: string,
    setModeFunc: React.Dispatch<React.SetStateAction<string>>
}

const Header = ({ currentClass, currentMode, setModeFunc }: HeaderProps) => {
    const content = (
        <span className="w-full flex items-center justify-between">
            <h1>{currentClass}</h1>
            <Toggle mode={currentMode} setModeFunc={setModeFunc} />
        </span>
    )

    const trailingContent = (
        <ThemeToggle />
    )

    return (
        <HeaderNavigationBase
            content={content}
            trailingContent={trailingContent}
        />
    )
};

export default Header