import React from 'react';
import './ModalBox.css';

const ModalBox = ({setModalBox, children}) => {
    return (
        <>
            <div onClick={() => setModalBox("none")} className="overlay"></div>
            <div className="modal-box">
                {children}
            </div>
        </>
    );
}

export default ModalBox;
