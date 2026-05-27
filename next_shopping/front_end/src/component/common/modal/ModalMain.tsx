"use client";

import { useModalStore } from "@/zustand/useModalStore"; 
import { Modal, ModalBackdrop, ModalContainer } from "@heroui/react";

export default function ModalMain() {
    const { isOpen, content, size, openModal, closeModal } = useModalStore()

    if(!isOpen) return null;

    return (
        <Modal isOpen={isOpen}>
            <ModalBackdrop>
                <ModalContainer size={size}>
                    {content}
                </ModalContainer>
            </ModalBackdrop>
        </Modal>
    )
}