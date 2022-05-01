import React from 'react';

const SmallTitle: React.FC<{ text: string }> = ({ text }) => {
  return <h3 className="font-bangers text-2xl">{text}</h3>;
};

export default SmallTitle;
