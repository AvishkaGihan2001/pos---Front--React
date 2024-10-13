import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-violet-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold ">POS System</div>
        <div className="hidden md:flex space-x-6">
          <Link
            to="/"
            className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-white
                      text-xl font-bold "
          >
            Home
          </Link>
          <Link
            to="/category"
            className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-white
                      text-xl font-bold "
          >
            Category
          </Link>
          <Link
            to="/product"
            className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-white
                      text-xl font-bold "
          >
            Product
          </Link>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          ></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
