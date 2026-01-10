import React, { useEffect, useRef, useState } from 'react'

interface Point {
  x: number,
  y: number
}

interface BoardSelectorProps {
  videoWidth: number | undefined
  videoHeight: number | undefined
  onConfirm: (points: Point[]) => void
}

const BoardSelector = ({ videoWidth, videoHeight, onConfirm }: BoardSelectorProps) => {
  const [points, setPoints] = useState<Point[]>([])

  const drawingCanvasRef = useRef<HTMLCanvasElement>(null)
  const eventOverlayRef = useRef<HTMLDivElement>(null)


  const handleMouseClick = (e: React.MouseEvent) => {
    if (!videoWidth || !videoHeight) {
      return
    }

    // Retrieve location of click
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * videoWidth
    const y = ((e.clientY - rect.top) / rect.height) * videoHeight
    
    const point: Point = { x, y }
    console.log("Clicked!", point, points)

    // Set context for drawing
    const ctx = drawingCanvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'
    ctx.lineWidth = 2

    // Reset drawing canvas
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    // if (points.length == 4) {
    //   // already drew 4 points
    //   return
    // }

    if (!videoWidth || !videoHeight) {
      return
    }

    // Draw circle at point
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI)
    ctx.fill()

    setPoints([...points, point])
  }


  const handleConfirm = () => {
    console.log("Handle confirm called", points)
    if (points.length == 4) {
      onConfirm(points)
    }
  }

  useEffect(() => {
    const drawingCanvas = drawingCanvasRef.current
    if (drawingCanvas && videoWidth && videoHeight) {
      drawingCanvas.width = videoWidth
      drawingCanvas.height = videoHeight
    }
    console.log(videoWidth, "jello")
    console.log(drawingCanvasRef.current?.width)
  }, [videoWidth, videoHeight])

  return (
    <div>
      <canvas
        ref={drawingCanvasRef}
        className="absolute inset-0 w-full h-full z-20 border-2 border-blue-500"
        style={{ pointerEvents: 'none' }}
      />
      <div
        className="absolute inset-0 w-full h-full z-30"
        ref={eventOverlayRef}
        onClick={handleMouseClick}
      />

      <button
        className='absolute px-4 py-1 bg-blue-600 text-white rounded'
        onClick={handleConfirm}
      >
        Confirm
      </button>

    </div>
  )
}

export default BoardSelector