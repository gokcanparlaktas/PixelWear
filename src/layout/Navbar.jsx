import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gray-100 border-b shadow-md font-nav">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <div>
          <img className="h-5" src="../images/logo.png" />
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 6h18M3 12h18m-6 6h6"
              />
            </svg>
          </button>

          <ul className="hidden md:flex space-x-8 text-base text-gray-500 font-bold">
            <li className="hover:text-gray-900">
              <a href="#home">Home</a>
            </li>
            <li className="hover:text-gray-900">
              <a href="#product">Product</a>
            </li>
            <li className="hover:text-gray-900">
              <a href="#pricing">Pricing</a>
            </li>
            <li className="hover:text-gray-900">
              <a href="#contact">Contact</a>
            </li>
          </ul>

          <button className="hidden md:block">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M3 10.5a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden bg-gray-100 ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <ul className="flex text-center text-3xl gap-5 mb-5 flex-col space-y-4 px-4 py-6 font-normal text-gray-600">
          <li className="hover:text-gray-900">
            <a href="#home">Home</a>
          </li>
          <li className="hover:text-gray-900">
            <a href="#product">Product</a>
          </li>
          <li className="hover:text-gray-900">
            <a href="#pricing">Pricing</a>
          </li>
          <li className="hover:text-gray-900">
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
