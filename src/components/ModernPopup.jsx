import React, { useEffect } from 'react';
import './ModernPopup.css';

const ModernPopup = ({ 
  isOpen, 
  onClose, 
  title, 
  message, 
  type = 'success', // 'success', 'error', 'info', 'warning'
  showCloseButton = true,
  autoClose = false,
  autoCloseDelay = 3000,
  showConfirmButton = false,
  onConfirm = null,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}) => {
  useEffect(() => {
    if (isOpen && autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDelay);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoClose, autoCloseDelay, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return 'ℹ️';
    }
  };

  const getTypeClass = () => {
    switch (type) {
      case 'success':
        return 'popup-success';
      case 'error':
        return 'popup-error';
      case 'warning':
        return 'popup-warning';
      case 'info':
        return 'popup-info';
      default:
        return 'popup-info';
    }
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className={`popup-container ${getTypeClass()}`} onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <div className="popup-icon">
            {getIcon()}
          </div>
          <h3 className="popup-title">{title}</h3>
          {showCloseButton && (
            <button className="popup-close" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
        <div className="popup-content">
          <p className="popup-message">{message}</p>
        </div>
        <div className="popup-footer">
          {showConfirmButton ? (
            <div className="popup-buttons">
              <button className="popup-button popup-cancel" onClick={onClose}>
                {cancelText}
              </button>
              <button className="popup-button popup-confirm" onClick={onConfirm}>
                {confirmText}
              </button>
            </div>
          ) : (
            <button className="popup-button" onClick={onClose}>
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernPopup;
