import Chat from '@/components/chatbot/Chat'
import Messages from '@/components/chatbot/Messages'

const Chatbot = () => {

  const testMessages = [
    {
      messageText: "Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers",
      messageFrom: "chatbot"
    },
    {
      messageText: "User text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers and information about your browsing patterns to create the best ",
      messageFrom: "user"
    },
    {
      messageText: "Chatbot text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers",
      messageFrom: "chatbot"
    },
    {
      messageText: "User text e and our 685 technology partners ask you to consent to the use of cookies to store and access personal data on your device. This can include the use of unique identifiers and information about your browsing patterns to create the best ",
      messageFrom: "user"
    }
  ]

  return (
    <div className='h-full w-full bg-primary'>
        <Messages messages={testMessages} />
        <Chat />
    </div>
  )
}

export default Chatbot