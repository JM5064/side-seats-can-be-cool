import { useRef, useEffect } from 'react'
import CaptureButton from './CaptureButton'

interface VideoProps {
  onSwitchMode: () => void
}


const Video = ({ onSwitchMode }: VideoProps) => {

  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

        // Copy the video onto canvas, then warp the canvas, then redraw canvas
        // Kinda a sus solution, but it works ig
        ctx.drawImage(videoRef.current, 0, 0)
        warpImage()
        ctx.drawImage(canvasRef.current, 0, 0)
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

  const warpImage = () => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const width = canvas.width / 2
    const height = canvas.height / 2

    if (width == 0 || height == 0) {
      return
    }
    
    const cv = (window as any).cv
    
    // Dummy data for now
    const inputPoints = [10, 10,  width-10, 10,  width-10, height-20,  10, height-200]
    const outputPoints = [0, 0, width, 0, width, height, 0, height]
    
    const inputMat = cv.matFromArray(4, 1, cv.CV_32FC2, inputPoints)
    const outputMat = cv.matFromArray(4, 1, cv.CV_32FC2, outputPoints)
    
    // Compute homography transformation
    const H = cv.getPerspectiveTransform(inputMat, outputMat)
    
    // Perform transformation
    const image = cv.imread(canvas)
    cv.resize(image, image, new cv.Size(width, height))
    const warped_image = new cv.Mat()
    
    // Slow for large images
    cv.warpPerspective(image, warped_image, H, new cv.Size(width, height))

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
    <div className='relative w-full h-full h-screen bg-black'>
    {/* <div> */}
      <video ref={videoRef} autoPlay playsInline muted className='w-full '/>
      {/* <video ref={videoRef} autoPlay playsInline muted /> */}
      
      <canvas ref={canvasRef} className='absolute top-0 left-0 w-full'/>
      {/* <canvas ref={canvasRef}/> */}

      <CaptureButton handleClick={handleClick}/>
    </div>
  )
}

export default Video