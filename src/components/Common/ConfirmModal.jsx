import React from 'react';
import { FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import './ConfirmModal.css';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = "O'chirish", cancelText = "Bekor qilish" }) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay confirm-modal-overlay" onClick={onClose}>
            <div className="modal-content confirm-modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <FaTimes />
                </button>
                <div className="modal-header confirm-modal-header">
                    <div className="confirm-icon-wrapper">
                        <FaExclamationTriangle />
                    </div>
                    <h2>{title || "Tasdiqlash"}</h2>
                    <p>{message || "Haqiqatan ham ushbu ma'lumotni o'chirib tashlamoqchimisiz? Bu amalni ortga qaytarib bo'lmaydi."}</p>
                </div>
                <div className="confirm-modal-actions">
                    <button className="confirm-modal-btn cancel" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button className="confirm-modal-btn confirm" onClick={onConfirm}>
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;
