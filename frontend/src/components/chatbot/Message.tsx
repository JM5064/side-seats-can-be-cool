import { TextArea } from '@/components/base/textarea/textarea'

export type MessageProps = {
    messageText : string,
    messageFrom : string
}

const Message = ({ messageText, messageFrom } : MessageProps) => {

    return (
        messageFrom === "user" ?
            <TextArea isRequired isReadOnly placeholder={messageText} 
                className={"brand-primary"}/>
            :
            <TextArea isRequired isReadOnly placeholder={messageText}
                className={"brand-secondary"} />
        
    )
}

export default Message