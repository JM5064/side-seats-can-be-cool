import { Send01 } from '@untitledui/icons';
import { Button } from "@/components/base/buttons/button";
import { TextArea } from '@/components/base/textarea/textarea';

const Chat = () => {
    return (
        <div className='h-min w-5/6 flex gap-4 p-8 border-2'>
            {/* <Input isRequired placeholder="Ask a question..." className='w-md'/> */}
            <TextArea isRequired placeholder='Ask a question...' rows={3} />
            <Button color="secondary" size="md" iconLeading={Send01} aria-label="Button CTA" />
        </div>
    )
};

export default Chat