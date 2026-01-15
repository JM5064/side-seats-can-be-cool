import { Send01 } from '@untitledui/icons';
import { Button } from "@/components/base/buttons/button";
import { useState } from 'react';
import type { Course } from '@/types/Course';
import type { MessageType } from '@/types/MessageType';

interface ChatProps {
    currentClass: Course
    messages: MessageType[]
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>
    setResponding: React.Dispatch<React.SetStateAction<boolean>>
}

const Chat = ({ currentClass, messages, setMessages, setResponding }: ChatProps) => {
    const [input, setInput] = useState("")
 
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (input.length === 0 || input.length > 1000) {
            return
        }

        const userMessages = [...messages, { text: input, messageFrom: "user" }]
        setMessages(userMessages)
        setInput("")
        
        setResponding(true)

        // Send request to backend
        const formData = new FormData();
        formData.append("msg", input)
        const res = await fetch(`https://side-seats-can-be-cool.onrender.com/${currentClass.id}`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        const data = await res.json();
        
        console.log("Data received!", data)
        
        const chatbotMessages = [...userMessages, { text: data.response, messageFrom: "chatbot" }]
        setResponding(false)
        setMessages(chatbotMessages)
    }

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
	}

    return (
        <footer className='w-full p-4 shadow-[inset_0px_1px_0px_0px] shadow-border-secondary md:px-6'>
            {/* <Input isRequired placeholder="Ask a question..." className='w-md'/> */}
            {/* <TextArea isRequired placeholder='Ask a question...' rows={3} /> */}
            <form className='flex h-24 items-center gap-4 p-8' onSubmit={handleSubmit}>
                <input 
                    value={input} autoComplete='off'
                    type="text" id="guess-input" placeholder="Ask a question..." onInput={handleInput}
                    className="w-full scroll-py-3 rounded-lg bg-primary px-3.5 py-3 text-md text-primary shadow-xs ring-1 ring-primary transition duration-100 ease-linear ring-inset placeholder:text-placeholder autofill:rounded-lg autofill:text-primary focus:outline-hidden"
                />

                <Button type='submit' color="primary" size="md" iconLeading={Send01} aria-label="Button CTA" />
            </form>

        </footer>
    )
};


export default Chat