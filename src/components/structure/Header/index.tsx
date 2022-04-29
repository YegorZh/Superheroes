import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const menu = [
    { name: 'Heroes', to: '/heroes' },
    { name: 'New Hero', to: '/heroes/new' },
  ];
  return (
    <div className="flex bg-red-700 py-3 px-8">
      <nav className="space-x-2">
        {menu.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="whitespace-nowrap rounded-sm px-4 py-1 font-bangers
                    text-5xl text-stone-200 hover:bg-stone-200 hover:text-stone-900"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Header;
