import { cx } from "@/utils/cx";
import { type MessageType } from '@/types/MessageType'

type MessageProps = {
  message: MessageType
}

const Message = ({ message }: MessageProps) => {
  return (
      <article className='flex min-w-0 flex-1 flex-col gap-1.5'>
        <div
          className={cx("relative rounded-lg text-md text-primary ring-1 ring-secondary ring-inset py-4 px-6 lg:w-3/5 sm:w-4/5",
            message.messageFrom === 'user' ?
              "rounded-tr-none bg-primary self-end"
              :
              "rounded-tl-none bg-secondary"
          )}
        >
          {message.text}
        </div>
      </article>
  )
}

export default Message