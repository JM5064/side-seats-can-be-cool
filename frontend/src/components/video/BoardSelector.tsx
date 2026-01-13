import React, { use, useEffect, useRef, useState } from 'react'
import { type Point } from '@/types/point'

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
    // console.log("Clicked!", point)

    // Set context for drawing
    const ctx = drawingCanvasRef.current?.getContext('2d')
    if (!ctx) return

    ctx.strokeStyle = 'red'
    ctx.fillStyle = 'red'
    ctx.lineWidth = 2

    setPoints([...points, point])

    // Draw circle at point
    ctx.beginPath()
    ctx.arc(x, y, 5, 0, 2 * Math.PI)
    ctx.fill()
  }

  useEffect(() => {
    // Set context for drawing
    const ctx = drawingCanvasRef.current?.getContext('2d')
    if (!ctx) return
    
    if (points.length == 5) {
      // 5th click: confirm points and warp
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

      onConfirm(sortPoints(points.slice(0, 4)))
    } else if (points.length == 6) {
      // 6th click: reset points and warp
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      setPoints([])
      onConfirm([])
    }

  }, [points])

  const sortPoints = (points: Point[]) => {
    const sortedY = [...points].sort((a, b) => a.y - b.y)
  
    // Top points: smaller y
    // Left points: smaller x
    const top = sortedY.slice(0, 2).sort((a, b) => a.x - b.x)
    const bottom = sortedY.slice(2, 4).sort((a, b) => a.x - b.x)
  
    return [top[0], top[1], bottom[1], bottom[0]]
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
  }, [videoWidth, videoHeight])

  return (
    <div>
      <canvas
        ref={drawingCanvasRef}
        className="absolute inset-0 w-full h-full z-20"
        style={{ pointerEvents: 'none' }}
      />
      <div
        className="absolute inset-0 w-full h-full z-30"
        ref={eventOverlayRef}
        onClick={handleMouseClick}
      />

      {/* <button
        className='absolute px-4 py-1 bg-blue-600 text-white rounded'
        onClick={handleConfirm}
      >
        Confirm
      </button> */}

    </div>
  )
}

export default BoardSelector