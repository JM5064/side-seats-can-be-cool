import { Send01 } from '@untitledui/icons';
import { Button } from "@/components/base/buttons/button";
import { TextArea } from '@/components/base/textarea/textarea';

const Chat = () => {
    return (
        <footer className='w-full p-4 shadow-[inset_0px_1px_0px_0px] shadow-border-secondary md:px-6'>
            <form className='flex h-24 items-center gap-4 p-8'>
                <TextArea isRequired placeholder='Ask a question...' aria-label="Button CTA"/>
                <Button color="secondary" size="md" iconLeading={Send01} aria-label="Button CTA" />
            </form>
        </footer>
    )
};


export default Chat