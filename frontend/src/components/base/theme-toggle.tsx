import { Button } from '@/components/base/buttons/button';
import { Moon01, Sun } from "@untitledui/icons";
import { useTheme } from '@/providers/theme-provider';

type Props = {
    mobile: boolean
}

export function ThemeToggle({ mobile }: Props) {
    const { theme, setTheme } = useTheme();

    return (
        mobile ? 
        <Button
            aria-label="Toggle theme"
            color="tertiary"
            size="sm"
            iconLeading={theme === "light" ? Moon01 : Sun}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
            Toggle theme
        </Button>
        :
        <Button
            aria-label="Toggle theme"
            color="tertiary"
            size="sm"
            iconLeading={theme === "light" ? Moon01 : Sun}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        />
    );
}