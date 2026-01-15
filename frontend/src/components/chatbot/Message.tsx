import { cx } from "@/utils/cx";
import { type MessageType } from '@/types/MessageType'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

type MessageProps = {
  message: MessageType
}

const Message = ({ message }: MessageProps) => {
  return (
    <article className='flex min-w-0 flex-1 flex-col gap-1.5 w-min'>
      <div
        className={cx("relative rounded-lg text-md text-primary ring-1 ring-secondary ring-inset py-4 px-6 lg:w-3/5 sm:w-4/5 prose",
          message.messageFrom === 'user' ?
            "rounded-tr-none bg-primary self-end"
            :
            "rounded-tl-none bg-secondary"
        )}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]}>
          {message.text}
        </ReactMarkdown>

      </div>
    </article>
  )
}

export default Message