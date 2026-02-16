"use client";

import { useModalStore } from "@/zustand/useModalStore"; 
import { Modal, ModalBackdrop, ModalContainer } from "@heroui/react";

export default function ModalMain() {
    const { isOpen, content, openModal, closeModal } = useModalStore()

    if(!isOpen) return null;

    console.log(isOpen)
    return (
        <Modal>
            <ModalBackdrop>
                <ModalContainer>
                    {content}
                </ModalContainer>
            </ModalBackdrop>
        </Modal>
    )
}