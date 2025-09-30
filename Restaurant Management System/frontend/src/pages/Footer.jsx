import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p className="text-sm">&copy; 2025 Restaurant Management System. All rights reserved.</p>
        </div>
        <div className="flex space-x-6">
          <a href="#" className="text-sm hover:text-blue-400 transition-colors">Home</a>
          <a href="#" className="text-sm hover:text-blue-400 transition-colors">About</a>
          <a href="#" className="text-sm hover:text-blue-400 transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;