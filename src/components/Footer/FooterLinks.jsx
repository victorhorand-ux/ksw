import React from 'react';
import { Link } from 'react-router-dom';

export default function FooterLinks({ title, links, handleLinkClick }) {
  return (
    <div>
      <h4 className="font-bold text-lg mb-4 sm:mb-6 text-white">{title}</h4>
      <ul className="space-y-3 sm:space-y-4">
        {links.map((link, i) => (
          <li key={i}>
            <Link 
              to={link.path} 
              onClick={handleLinkClick} 
              className="text-slate-400 hover:text-sky-400 hover:translate-x-1 transition-all inline-block font-medium text-sm sm:text-base"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}