import { useState } from "react";
import { Input } from "@/components/base/input/input";
import { Button } from "@/components/base/buttons/button";
import type { Course } from "@/types/Course";

type ModalProps = {
    closeFunc: ((func: React.SetStateAction<boolean>) => void),
    allClasses: Course[]
    setAllClasses: React.Dispatch<React.SetStateAction<Course[]>>
}

const NewClassModal = ({ closeFunc, allClasses, setAllClasses }: ModalProps) => {
    const [resp, setResp] = useState("");

    const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(resp);
        closeFunc(false)
        await createClass(resp)
    }

    const createClass = async (title: string) => {
        // Send request to backend
        const formData = new FormData();
        formData.append("title", title)
        const res = await fetch(`http://127.0.0.1:5000/createclass`, {
            method: "POST",
            body: formData,
            credentials: "include"
        });

        const data = await res.json();

        if (data.status === "ok") {
            const newClass = {
                id: data.course_id,
                title: title
            }
            setAllClasses([...allClasses, newClass])
        }
    }

    return (
        <form className="fixed inset-0 z-50 flex min-h-dvh w-full items-end justify-center overflow-y-auto bg-overlay/70 px-4 pt-4 pb-[clamp(16px,8vh,64px)] outline-hidden backdrop-blur-[6px] sm:items-center sm:justify-center sm:p-8" onSubmit={formSubmit}>
            <div className="max-h-full w-full align-middle outline-hidden max-sm:overflow-y-auto max-sm:rounded-xl" data-rac>
                <section id="react-aria-_R_9bsnpfiv7b_" className="flex w-full items-center justify-center outline-hidden" data-rac aria-labelledby="modal-title" role="dialog">
                    <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100">
                        <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                            <div className="z-10 flex flex-col gap-0.5 prose">
                                <h3 id="modal-title" slot="title">New course</h3>
                                <p>Please enter a name for this course.</p>
                            </div>
                        </div>
                        <div className="h-5 w-full"></div>
                        <div className="relative flex flex-col px-4 sm:px-6">
                            <Input isRequired label="Course name" placeholder="e.g. COMP310" onChange={(e) => setResp(e)} />
                        </div>
                        <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                            <Button
                                color="secondary-destructive"
                                size="lg"
                                onClick={(e: any) => closeFunc(false)}>
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                size="lg"
                                type="submit">
                                Create
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        </form>
    )
}

export default NewClassModal