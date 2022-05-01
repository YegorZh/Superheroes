import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const menu = [
    { name: 'Heroes', to: '/heroes' },
    { name: 'New Hero', to: '/heroes/new' },
  ];
  return (
    <div className="bg-red-700 py-3 px-4 sm:px-8">
      <nav className="space-x-2">
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="whitespace-nowrap rounded-sm px-2 py-1 font-bangers
                    text-2xl text-stone-200 hover:bg-stone-200 hover:text-stone-900 
                    sm:px-4 sm:text-5xl"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
