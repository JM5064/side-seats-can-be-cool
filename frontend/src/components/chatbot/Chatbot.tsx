import Chat from '@/components/chatbot/Chat'
import Messages from '@/components/chatbot/Messages'
import type { Course } from '@/types/Course'
import { type MessageType } from '@/types/MessageType'
import { useEffect, useState } from 'react'

interface ChatbotProps {
  currentClass: Course
}


const Chatbot = ({ currentClass }: ChatbotProps) => {

  const [messages, setMessages] = useState<MessageType[]>([])
  const [responding, setResponding] = useState<boolean>(false)

  useEffect(() => {
    const fetchMessages = async () => {
      const res = await fetch(`https://side-seats-can-be-cool.onrender.com/getchat/${currentClass.id}`, {
        method: "GET",
        credentials: "include"
      });
    
      const data = await res.json()

      console.log("Data received!", data)
      if (data.status === "ok") {
        const userChats = data.user_chats
        const chatbotChats = data.chatbot_chats

        const newMessages: MessageType[] = []

        for (let i = 0; i < userChats.length; i++) {
          newMessages.push({ text: userChats[i], messageFrom: "user" })
          newMessages.push({ text: chatbotChats[i], messageFrom: "chatbot" })
        }

        setMessages(newMessages)
      }
      
    }
    
    fetchMessages()
  }, [currentClass])

  return (
    <>
        <Messages messages={messages} responding={responding} />
        <Chat currentClass={currentClass} messages={messages} setMessages={setMessages}  setResponding={setResponding}/>
    </>
  )
}

export default Chatbot