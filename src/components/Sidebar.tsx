import React from 'react';

const Sidebar = () => {
  return (
    <aside className="fixed right-0 top-20 h-screen w-[200px] z-40 hidden lg:flex flex-row border-l-4 border-black bg-white">
      {/* Vertical Strip 1 */}
      <div className="w-[64px] border-r-4 border-black flex items-center justify-center">
        <span className="vertical-text text-xl font-mono font-extrabold uppercase tracking-widest text-black">
          DESIGN
        </span>
      </div>

      {/* Vertical Strip 2 */}
      <div className="w-[64px] border-r-4 border-black flex items-center justify-center">
        <span className="vertical-text text-xl font-mono font-extrabold uppercase tracking-widest text-black">
          BUILD
        </span>
      </div>

      {/* Vertical Strip 3 */}
      <div className="w-[68px] flex items-center justify-center">
        <span className="vertical-text text-xl font-mono font-extrabold uppercase tracking-widest text-black">
          SHIP
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
