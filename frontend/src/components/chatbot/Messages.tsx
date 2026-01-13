import Message from '@/components/chatbot/Message'
import { type MessageType } from '@/types/MessageType'

type MessagesProps = {
  messages: MessageType[]
}

const Messages = ({ messages }: MessagesProps) => {

  return (
    <div className='flex-1 overflow-y-auto'>
      <ol className='flex h-content flex-col gap-8 px-6 py-8 md:px-8'>
        {messages.map((message, index) =>
          <li key={index} className='relative flex items-start gap-3'>
            <Message message={message} />
          </li>
        )}
      </ol>
    </div>
  )
}

export default Messages