import { TextArea } from '@/components/base/textarea/textarea'
import { type MessageType } from '@/types/MessageType'

type MessageProps = {
    message: MessageType
}

const Message = ({ message } : MessageProps) => {

  // Add tailwind css to this to make it a nice Message component (like the chatgpt messages): <div className='primary w-1/2' >
  return (
    <div className='flex justify-end py-3'>
      {
      message.messageFrom === "user" ?
        <div
          className="rounded-xl bg-secondary px-4 py-3 text-primary w-1/2 justify-end"
        >
          {message.text}
        </div>

        :

        <div
          className="rounded-xl px-4 py-4 text-primary"
        >
          {message.text}
        </div>
      }
    </div>
  )
}

export default Message