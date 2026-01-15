import { Camera01 } from "@untitledui/icons"
import { Button } from "@/components/base/buttons/button"

interface CaptureButtonProps {
  handleClick: () => void
}

const CaptureButton = ({ handleClick }: CaptureButtonProps) => {
  
  return (
    <Button className="transition duration-150 ease-in-out active:opacity-70" color="secondary" onClick={handleClick} size="xl" iconLeading={Camera01} aria-label="Capture photo" />
  )
}

export default CaptureButton