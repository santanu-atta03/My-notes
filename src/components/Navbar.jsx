import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavbarData } from '../Data/Navbar'

const Navbar = () => {
  return (
    <div className="flex flex-row justify-around p-4 gap-5">
      {NavbarData.map((link, idx) => (
        <NavLink
        key={idx}
        to={link.path}
        className={({ isActive }) =>
            isActive
            ? "text-blue-500 font-semibold text-xl"
            : "text-white font-medium text-xl"
        }
        >
        {link.title}
        </NavLink>
    ))}
    </div>
  )
}

export default Navbar
