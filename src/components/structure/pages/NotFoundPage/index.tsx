import React from 'react';
import ErrorMessage from '../../../reusable/ErrorMessage';

const NotFoundPage: React.FC = () => {
  return (
    <div className="px-12 py-6">
      <ErrorMessage message={'Resource not found'} />
    </div>
  );
};

export default NotFoundPage;
