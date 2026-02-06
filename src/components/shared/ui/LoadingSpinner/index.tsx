import React from 'react';

interface LoadingSpinnerProps {
  height?: string;
  spinnerSize?: string;
  spinnerColor?: string;
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  height = 'h-[272px]',
  spinnerSize = 'h-8 w-8',
  spinnerColor = 'border-base-300',
  message = '',
}) => (
  <div className={`flex flex-col items-center justify-center ${height}`}>
    <div className={`animate-spin rounded-full ${spinnerSize} border-b-2 ${spinnerColor}`}></div>
    {message && <p className="mt-4 text-base-400 text-sm">{message}</p>}
  </div>
);

export default LoadingSpinner;