import React from 'react';

import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';

import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { closeDetailModal } from '@/redux/features/movieReducer';

import DetailCastModal from './modal/DetailCastModal';
import DetailVideosModal from './modal/DetailVideosModal';
import DetailImagesModal from './modal/DetailImagesModal';
import Card from '@mui/material/Card';


export default function DetialModal () {
    const modalControl = useAppSelector((state)=> state.detailModal);
    const dispatch = useAppDispatch();

    const closeFn = () => {
        dispatch(closeDetailModal())
    }

    React.useEffect(()=> {

        return (
            closeFn()
        )
    },[])
    const modalContent = () => {
        switch (modalControl.name) {
            case "Cast" :
                return <DetailCastModal />
            case "Videos" : 
                return <DetailVideosModal />
            case "Images" : 
                return <DetailImagesModal />
            default : break; 
        }
    }

    return (
        <div>
            <Modal
                open={modalControl.openYn}
                onClose={closeFn}
                closeAfterTransition
                slots={{ backdrop : Backdrop}}
                slotProps={{ backdrop : {timeout : 500}}}>
                    <Fade in={modalControl.openYn}>
                        <Card
                            sx={{
                                position : 'absolute' as 'absolute',
                                top : '50%',
                                left : '50%',
                                transform: 'translate(-50%, -50%)',
                                width : 600,
                                height : '85vh',
                                borderRadius : 2
                            }}
                        >
                        {modalContent()}
                        </Card>
                    </Fade>
            </Modal>
        </div>
    )
}