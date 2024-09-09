import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";

// Link and social icon data
const links = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/bikes", label: "Bikes" },
];

const socialIcons = [
  { icon: <FaFacebookF />, url: "https://facebook.com" },
  { icon: <FaInstagram />, url: "https://instagram.com" },
  { icon: <FaLinkedinIn />, url: "https://linkedin.com" },
  { icon: <FaYoutube />, url: "https://youtube.com" },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 mt-10 dark:border-t">
      <div className="container mx-auto px-4 flex flex-wrap justify-between">
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <NavLink to="/" className="flex items-center">
            <img
              className="h-[50px] py-1 cursor-pointer"
              src={Logo}
              alt="Bikebay Logo"
            />
          </NavLink>
          <p className="lg:w-[70%] mt-2">
            BikeBay is transforming the way people experience bike rentals by
            making the process simpler, faster, and more convenient than ever
            before
          </p>
        </div>
        {/* Useful Links Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h4 className="font-bold mb-2">Useful Links</h4>
          <ul>
            {links.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path} className="hover:text-gray-300">
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        {/* Follow Us Section */}
        <div className="w-full md:w-1/3">
          <h4 className="font-bold mb-2">Follow Us</h4>
          <div className="flex space-x-4">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        © 2024 Bikebay. All rights reserved.
      </div>
    </footer>
  );
};
