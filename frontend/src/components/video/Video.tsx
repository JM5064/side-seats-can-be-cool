import { useRef, useEffect, useState } from 'react'
import CaptureButton from '@/components/video/CaptureButton'
import BoardSelector from '@/components/video/BoardSelector'
import { type Point } from '@/types/point'

const Video = () => {

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [videoWidth, setVideoWidth] = useState(0)
  const [videoHeight, setVideoHeight] = useState(0)

  const [boardCorners, setBoardCorners] = useState<Point[]>([])
  // Use ref as well since state variable change doesn't reflect inside requestAnimationFrame
  const boardCornersRef = useRef<Point[]>([]) 

  // Initialize video feed
  useEffect(() => {
    async function init() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 2450 },
            height: { ideal: 1440 }
          }
        })
  
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onplay = () => {
            requestAnimationFrame(updateCanvas)
          }
        }
      } catch (error) {
        console.log("Error initializing", error)
      }
    }

    init()
  }, [])

  // Refresh canvas with new video
  const updateCanvas = () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d', { willReadFrequently: true })
      if (ctx) {
        canvasRef.current.width = videoRef.current.videoWidth
        canvasRef.current.height = videoRef.current.videoHeight

        setVideoWidth(videoRef.current.videoWidth)
        setVideoHeight(videoRef.current.videoHeight)

        // Copy the video onto canvas, then warp the canvas, then redraw canvas
        // Kinda a sus solution, but it works ig
        ctx.drawImage(videoRef.current, 0, 0)

        if (boardCornersRef.current.length >= 4) {
          warpImage()
          ctx.drawImage(canvasRef.current, 0, 0)
        }
      }
    }

    requestAnimationFrame(updateCanvas)
  }

  // Run opencv.js initialization when page loads
  useEffect(() => {
    awaitOpenCV().then(() => {
      console.log("opencv.js initialized")
    })
  }, [])


  // Wait for opencv.js to initialize
  const awaitOpenCV = () => {
    return new Promise(resolve => {
      const check = () => {
        // Resolve only when window has cv object
        if ((window as any).cv && (window as any).cv.imread) {
          resolve(1) 
        } else { 
          setTimeout(check, 50)
        }
      }
      check()
    })
  }

  useEffect(() => {
    boardCornersRef.current = boardCorners
  }, [boardCorners])

  const warpImage = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const boardCorners = boardCornersRef.current
    if (boardCorners.length < 4) {
      return
    }

    // Scale down the image to reduce lag
    const scale = 2
    const newWidth = canvas.width / scale
    const newHeight = canvas.height / scale

    if (newWidth == 0 || newHeight == 0) {
      return
    }
    
    const cv = (window as any).cv
    
    // Transform corner input points into ideal output points
    // Top left, Top right, Bottom right, bottom left
    const inputPoints = [
      boardCorners[0].x / scale, boardCorners[0].y / scale,
      boardCorners[1].x / scale, boardCorners[1].y / scale,
      boardCorners[2].x / scale, boardCorners[2].y / scale,
      boardCorners[3].x / scale, boardCorners[3].y / scale,
    ]
    const outputPoints = [0, 0, newWidth, 0, newWidth, newHeight, 0, newHeight]
    
    const inputMat = cv.matFromArray(4, 1, cv.CV_32FC2, inputPoints)
    const outputMat = cv.matFromArray(4, 1, cv.CV_32FC2, outputPoints)
    
    // Compute homography transformation
    const H = cv.getPerspectiveTransform(inputMat, outputMat)
    
    // Perform transformation
    const image = cv.imread(canvas)
    cv.resize(image, image, new cv.Size(newWidth, newHeight))
    const warped_image = new cv.Mat()
    
    // Slow for large images
    cv.warpPerspective(image, warped_image, H, new cv.Size(newWidth, newHeight))

    // Rescale image back to original size (slow for some reason)
    // cv.resize(warped_image, warped_image, new cv.Size(width * scale, height * scale))

    // Replace canvas with the warped image
    cv.imshow(canvas, warped_image)

    // Clean up allocated memory
    inputMat.delete()
    outputMat.delete()
    image.delete()
    warped_image.delete()
    H.delete()  
  }

  const handleClick = () => {
    const processingCanvas = captureFrame()
    if (!processingCanvas) {
      return
    }

    console.log("Image capture button clicked!")
  }

  const captureFrame = (): HTMLCanvasElement | null => {
    if (!canvasRef.current || !videoRef.current) {
      console.log("Canvas not ready")
      return null
    }

    const processingCanvas = document.createElement('canvas')
    const video = videoRef.current
    const ctx = processingCanvas.getContext('2d')!

    processingCanvas.width = video.videoWidth
    processingCanvas.height = video.videoHeight
    ctx.drawImage(video, 0, 0)

    return processingCanvas
  }


  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center overflow-hidden">
      <div className="relative w-fit h-fit">
        <video ref={videoRef} autoPlay playsInline muted className="block max-h-screen max-w-full" />
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10" />
        <BoardSelector 
          videoWidth={videoWidth} 
          videoHeight={videoHeight} 
          onConfirm={(points) => setBoardCorners(points)}
        />
      </div>
  
      <div className="absolute bottom-5 z-40">
        <CaptureButton handleClick={handleClick}/>
      </div>
    </div>
  )
}

export default Video