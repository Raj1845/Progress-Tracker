import React from 'react';

const SpinnerIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={3} 
    stroke="currentColor" 
    className={className}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

interface AutoSaveIndicatorProps {
  status: 'idle' | 'saving' | 'saved';
}

const AutoSaveIndicator: React.FC<AutoSaveIndicatorProps> = ({ status }) => {
  const isVisible = status !== 'idle';
  
  let content;
  if (status === 'saving') {
      content = (
          <>
              <SpinnerIcon className="w-4 h-4 mr-2 text-gray-500" />
              <span>Saving...</span>
          </>
      );
  } else if (status === 'saved') {
      content = (
          <>
              <CheckIcon className="w-4 h-4 mr-2 text-green-600" />
              <span>Saved</span>
          </>
      );
  } else {
      content = null;
  }

  return (
      <div 
        className="h-6 flex items-center text-sm font-medium text-gray-600"
        aria-live="polite"
        aria-atomic="true"
      >
        <div className={`transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'} flex items-center`}>
          {content}
        </div>
      </div>
  );
};

export default AutoSaveIndicator;