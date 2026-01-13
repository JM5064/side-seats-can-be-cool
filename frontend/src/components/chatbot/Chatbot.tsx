import Chat from '@/components/chatbot/Chat'
import Messages from '@/components/chatbot/Messages'
import type { Course } from '@/types/Course'
import { type MessageType } from '@/types/MessageType'

interface ChatbotProps {
  currentClass: Course
}


const Chatbot = ({ currentClass }: ChatbotProps) => {

  const testMessages = [
    {
      text: "User text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers and information about your browsing patterns to create the best ",
      messageFrom: "user"
    },
    {
      text: "Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers",
      messageFrom: "chatbot"
    },
    {
      text: "User text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers and information about your browsing patterns to create the best ",
      messageFrom: "user"
    },
    {
      text: "Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to store Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to storeChatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to storeChatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to storeChatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to storeChatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to storeChatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to storeChatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers. Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to store",
      messageFrom: "chatbot"
    },
  ]

  return (
    <>
        <Messages messages={testMessages} />
        <Chat currentClass={currentClass} />
    </>
  )
}

export default Chatbot