import { cx } from "@/utils/cx";
import { type MessageType } from '@/types/MessageType'

type MessageProps = {
  message: MessageType
}

const Message = ({ message }: MessageProps) => {

  // Add tailwind css to this to make it a nice Message component (like the chatgpt messages): <div className='primary w-1/2' >
  return (
    <li className='relative flex items-start gap-3 pr-8 lg:pr-10'>
      <article className='flex min-w-0 flex-1 flex-col gap-1.5'>
        <div
          className={cx("relative rounded-lg px-3 py-2 text-md text-primary ring-1 ring-secondary ring-inset pr-4 w-3/5",
            message.messageFrom === 'user' ?
              "rounded-tr-none bg-primary self-end" : "rounded-tl-none bg-secondary"
          )}
        >
          {message.text}
        </div>
      </article>

    </li>
  )
}

export default Message