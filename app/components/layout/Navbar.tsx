import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white text-black py-2 px-4 border-b border-gray-300 z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-4 flex-grow">
          <Link href="/" className="text-4xl font-bold font-serif">
             Medium 
            {/* <img src='https://www.svgrepo.com/show/354057/medium-icon.svg' className='w-8 h-8'/> */}
          </Link>
          <div className="relative flex-grow">
            <input 
              type="text" 
              className="h-10 w-full sm:w-56 pl-10 pr-4 py-1 rounded-full bg-gray-100 text-black border border-gray-300 placeholder-gray-500 focus:outline-none focus:border-gray-400" 
              placeholder="Search" 
            />
            <svg
              className="absolute left-3 top-2.5 w-5 h-5 text-gray-500"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.365 4.365a1 1 0 01-1.414 1.414l-4.365-4.365zM14 8a6 6 0 11-12 0 6 6 0 0112 0z" clipRule="evenodd" />
            </svg>
          </div>
          <Link href="/" className="hover:underline">
            <img src="https://static.vecteezy.com/system/resources/previews/005/005/788/original/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg" alt="icon1" className="w-8 h-8 object-cover rounded-full" />
          </Link>
        </div>
        <nav className="flex items-center gap-4 mt-2 ml-6 sm:mt-0 text-lg">
          {/* <Link href="/following" className="hidden sm:block hover:underline">
            <img src="/img/icon2.svg" alt="icon2" className="w-6 h-6" />
          </Link> */}
          <Link href="/topics" className="hidden sm:block hover:underline">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcXrDYIdCrdQoXJZCETkOEUsuKoAo-DfJ14A&s" alt="icon3" className="w-6 h-6" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
