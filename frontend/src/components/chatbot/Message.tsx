import { TextArea } from '@/components/base/textarea/textarea'

type MessageProps = {
    messageText : string,
    messageFrom : string
}

const Message = ({ messageText, messageFrom } : MessageProps) => {

    return (
        messageFrom === "user" ?
            <TextArea isRequired isReadOnly placeholder={messageText} 
                className={"primary"}/>
            :
            <TextArea isRequired isReadOnly placeholder={messageText}
                className={"secondary"} />
        
    )
}

export default Message