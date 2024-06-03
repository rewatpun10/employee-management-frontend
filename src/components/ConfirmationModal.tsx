import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel, message }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>{message}</p>
                <div className='modal-button-container'>
                    <button className="modal-button modal-button-ok" onClick={onConfirm}>OK</button>
                    <button className="modal-button modal-button-cancel" onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
