import React from 'react';

const LoadingSpinner = ({ size = 'medium', color = '#3b82f6', text = '' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="loading-spinner-container">
      <div 
        className={`loading-spinner ${sizeClasses[size]}`}
        style={{ borderTopColor: color }}
      />
      {text && <span className="loading-text">{text}</span>}
      }
    </div>
  );
};

export default LoadingSpinner;