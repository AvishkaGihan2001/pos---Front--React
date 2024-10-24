import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const{logout} = useAuth();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className=" bg-gradient-to-r from-violet-600 to-purple-900 p-4 rounded-sm shadow-lg hover:shadow-xl">
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
          <div className="relative inline-block">
            {/* Order Button */}
            <button
              onClick={toggleDropdown}
              className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-white text-xl font-bold"
            >
              Order
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute mt-2 w-48 bg-violet-400 rounded-lg shadow-lg z-10">
                <ul className="py-2">
                  <li>
                    <Link
                      to="/orderDetails"
                      className="block px-4 py-2 text-gray-800 hover:bg-violet-300"
                    >
                      View Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order"
                      className="block px-4 py-2 text-gray-800 hover:bg-violet-300"
                    >
                      Place Order
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <Link
            to="/user"
            className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-white
                      text-xl font-bold "
          >
            User
          </Link>
          <button className="text-white hover:text-gray-300 border-b-2 border-transparent hover:border-white
                      text-xl font-bold " onClick={logout}>
            Logout
          </button>
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
