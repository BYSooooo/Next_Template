import { Modal } from "@heroui/react";

export default function LoginModal() {

    return (
        <Modal.Dialog className="">
            <Modal.CloseTrigger>
                <Modal.Header>
                    <Modal.Heading>
                        Login
                    </Modal.Heading>
                </Modal.Header>
            </Modal.CloseTrigger>
        </Modal.Dialog>       
    )
}