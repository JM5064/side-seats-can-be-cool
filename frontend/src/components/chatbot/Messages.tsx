import Message from '@/components/chatbot/Message'
import { type MessageType } from '@/types/MessageType'

type MessagesProps = {
  messages: MessageType[]
}

const Messages = ({ messages }: MessagesProps) => {

  return (
    <div className='flex-1 overflow-y-auto px-4 py-6 space-y-4'>
      {messages.map((message) => 
        <Message message={message} />
      )}
    </div>
  )
}

export default Messages