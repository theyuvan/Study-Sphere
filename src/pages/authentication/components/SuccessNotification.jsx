import React, { useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SuccessNotification = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className="bg-success text-success-foreground rounded-lg shadow-elevated p-4 max-w-sm">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Icon name="CheckCircle" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-success-foreground/80 hover:text-success-foreground transition-micro"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessNotification;