export const LoadingMessage = () => {
    return (
        <div className="flex h-7 w-10 items-center justify-center gap-1 self-start rounded-lg rounded-tl-none bg-secondary text-md text-primary ring-1 ring-secondary ring-inset">
            <div className="size-1 animate-bounce rounded-full bg-fg-tertiary [animation-delay:-0.3s]"></div>
            <div className="size-1 animate-bounce rounded-full bg-fg-quaternary [animation-delay:-0.15s]"></div>
            <div className="size-1 animate-bounce rounded-full bg-fg-tertiary"></div>
        </div>
    )
}