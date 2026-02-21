import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between h-20 px-8 bg-white border-b-4 border-black">
      {/* Left: Logo Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-12 h-12 bg-black border-2 border-black rotate-3 shadow-neo-4">
          <div className="w-6 h-6 border-2 border-white rotate-45" />
        </div>
        <span className="text-2xl font-extrabold text-black font-sans uppercase tracking-tighter">
          YOUR NAME
        </span>
      </div>

      {/* Right: Menu & Contact Button */}
      <div className="flex items-center gap-6">
        <div className="hidden lg:flex items-center gap-8 mr-4">
          <a href="#about" className="font-mono font-bold text-black uppercase hover:text-volt transition-colors text-sm">ABOUT ME</a>
          <a href="#courses" className="font-mono font-bold text-black uppercase hover:text-volt transition-colors text-sm">COURSES</a>
          <a href="#columns" className="font-mono font-bold text-black uppercase hover:text-volt transition-colors text-sm">COLUMNS</a>
          <a href="#booking" className="font-mono font-bold text-black uppercase hover:text-volt transition-colors text-sm">BOOKING</a>
          <a href="#contact" className="font-mono font-bold text-black uppercase hover:text-volt transition-colors text-sm">CONTACT</a>
        </div>

        <a
          href="#contact"
          className="bg-black text-white px-6 py-2 border-2 border-black font-mono font-bold uppercase rounded-lg hover:bg-volt hover:text-black transition-colors shadow-neo-4 text-sm"
        >
          CONTACT ME
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
