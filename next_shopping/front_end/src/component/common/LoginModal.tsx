import { Modal } from "@heroui/react";

export default function LoginModal() {
    return (
        
        <Modal.Backdrop>
            <Modal.Container size="lg">
                <Modal.Dialog>
                    <Modal.CloseTrigger />
                    <Modal.Header>
                        <p className="text-xl font-extrabold">
                            Login
                        </p>
                    </Modal.Header>
                </Modal.Dialog>
            </Modal.Container>
        </Modal.Backdrop>
        
    )
}