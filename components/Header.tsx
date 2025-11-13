import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-10 py-4 px-4 md:px-8 border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-black">
            Progress Tracker
          </h1>
          <p className="text-gray-500 text-sm mt-1">Log your progress, one rep at a time.</p>
        </div>
        <div>
            <p className="text-lg font-medium text-black">Hello Raj.</p>
        </div>
      </div>
    </header>
  );
};

export default Header;