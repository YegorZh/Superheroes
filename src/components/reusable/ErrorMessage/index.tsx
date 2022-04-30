import React from 'react';

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => {
  return (
    <div className="w-fit max-w-lg rounded  bg-red-700 p-3 text-stone-200">
      <span className="font-bangers text-4xl font-normal">Error!</span>
      <div className="font-bangers text-2xl">{message}</div>
    </div>
  );
};

export default ErrorMessage;
